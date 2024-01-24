import { Check } from "@mui/icons-material";
import { Alert, Autocomplete, Button, Container, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { FormEventHandler, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "../api";
import { CustomFieldEditor } from "../components/edit-collection/CustomFieldEditor";
import { UserContext } from "../components/UserProvider";
import { ROUTES } from "../router";
import { Collection } from "../types";
import { editCollectionSchema, newCollectionSchema } from "../zod/forms";

export function EditCollectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const collectionToEdit = location.state as Collection | undefined;

  const initialCollectionState = {
    title: collectionToEdit?.title || "",
    description: collectionToEdit?.description || "",
    category: collectionToEdit?.category
      ? { id: collectionToEdit.category?.id, title: collectionToEdit.category?.title }
      : { id: 0, title: "Other" },
    tags: collectionToEdit?.collectionTags.map(({ tag }) => tag) || [],
    attributes: collectionToEdit ? [...collectionToEdit.attributes] : [],
  };

  const [collection, setCollection] = useState<{
    title: string;
    description: string;
    category: { title: string; id: number };
    tags: string[];
    attributes: Collection["attributes"];
  }>(initialCollectionState);

  const [error, setError] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await api.getCategories();
      return [{ id: 0, title: "Other" }].concat(result);
    },
    retry: false,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const categoryId = collection.category.id || undefined;
    const formData = {
      ...collection,
      categoryId,
      attributes: collection.attributes.map(({ title, id, type }) => {
        if (collectionToEdit) {
          return { id, title };
        }
        return { type, title };
      }),
    };
    const schema = collectionToEdit ? editCollectionSchema : newCollectionSchema;
    const validation = schema.safeParse(formData);
    if (!validation.success) {
      setError("Please fill all required fields.");
      return;
    }
    const apiMethod = collectionToEdit
      ? api.updateCollection.bind(api, collectionToEdit.id)
      : api.postCollection.bind(api);
    setError("");
    const { error } = await apiMethod(formData);
    if (error) {
      console.error(error);
      setError("An error occured.");
      return;
    }
    navigate(ROUTES.USER({ id: collectionToEdit ? collectionToEdit.userId : user!.id }));
  };

  return (
    <Container maxWidth="md">
      <h1>{collectionToEdit ? "Edit" : "New"} collection</h1>

      <Grid container component="form" rowGap={2} columnSpacing={1} onSubmit={handleSubmit}>
        <Grid xs={12}>
          <TextField
            fullWidth
            label={
              <span>
                Title: <em>(required)</em>
              </span>
            }
            value={collection.title}
            onChange={(e) => setCollection((values) => ({ ...values, title: e.target.value }))}
          />
        </Grid>

        <Grid xs={12} sm={6}>
          <Autocomplete
            options={categories || []}
            getOptionLabel={(item) => item.title}
            disableClearable
            renderInput={(params) => <TextField {...params} label={<span>Select category</span>} />}
            isOptionEqualToValue={({ id: id1 }, { id: id2 }) => id1 === id2}
            value={collection.category}
            onChange={(_, v) => v && setCollection((values) => ({ ...values, category: v }))}
          />
        </Grid>

        <Grid xs={12} sm={6}>
          <Autocomplete
            freeSolo
            multiple
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <span>
                    Select tags <em>(press Enter to add)</em>
                  </span>
                }
              />
            )}
            value={collection.tags}
            onChange={(_, v) => setCollection((state) => ({ ...state, tags: v }))}
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            multiline
            minRows={8}
            size="small"
            label="Description:"
            helperText="Supports markdown syntax"
            fullWidth
            value={collection.description}
            onChange={(e) =>
              setCollection((values) => ({ ...values, description: e.target.value }))
            }
          />
        </Grid>

        <Grid xs={12} sm={6}>
          <CustomFieldEditor
            mode={collectionToEdit ? "editing" : "creating"}
            attributes={collection.attributes}
            setAttributes={(newState) =>
              setCollection((state) => ({ ...state, attributes: newState }))
            }
          />
        </Grid>

        {error && (
          <Grid xs={12} mt={2}>
            <Alert severity="error" variant="outlined">
              {error}
            </Alert>
          </Grid>
        )}

        <Grid xs={12} mt={2} mb={8} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" endIcon={<Check />}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
