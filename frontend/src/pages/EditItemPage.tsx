import { Check, FileUpload } from "@mui/icons-material";
import { Button, Checkbox, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "../api";
import { ROUTES } from "../router";
import { Collection, CustomAttributeType, CustomAttributeValue, Item } from "../types";

interface CustomFieldProps {
  title: string;
  value: CustomAttributeValue;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function CustomSmallText({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography>{title}</Typography>
      <TextField fullWidth value={value} onChange={onChange} />
    </label>
  );
}

function CustomBigText({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography>{title}</Typography>
      <TextField multiline minRows={8} size="small" fullWidth value={value} onChange={onChange} />
    </label>
  );
}

function CustomNumber({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography>{title}</Typography>
      <TextField type="number" sx={{ width: "8rem" }} value={value} onChange={onChange} />
    </label>
  );
}

function CustomCheckbox({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography display="inline-block">{title}</Typography>
      <Checkbox checked={value as boolean} onChange={onChange} />
    </label>
  );
}

function CustomDate({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography>{title}</Typography>
      <TextField fullWidth value={value} onChange={onChange} />
    </label>
  );
}
// const mockCustomFields: CustomField[] = [
//   { title: "sm1", type: "smallText", value: "" },
//   {
//     title: "sm2",
//     type: "smallText",
//     value: "HellO!",
//   },
// ];

const templates: Record<CustomAttributeType, FC<CustomFieldProps>> = {
  smallText: CustomSmallText,
  bigText: CustomBigText,
  number: CustomNumber,
  checkbox: CustomCheckbox,
  date: CustomDate,
};

const defaultValues = {
  smallText: "",
  bigText: "",
  number: 0,
  checkbox: false,
  date: "",
};

export function EditItemPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const itemToEdit = state.item as Item | undefined;
  const collection = state.collection as Collection | undefined;
  const attributesWithValue = itemToEdit && itemToEdit.itemAttributes;
  const collectionAttributes = collection && collection.attributes;

  const initialState = {
    title: itemToEdit?.title || "",
    description: itemToEdit?.description || "",
    attributes:
      attributesWithValue ||
      collectionAttributes?.map((attribute) => ({
        attribute,
        value: defaultValues[attribute.type],
      })) ||
      [],
  };

  const [item, setItem] = useState<{
    title: string;
    description: string;
    attributes: Item["itemAttributes"];
  }>(initialState);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = {
      collectionId: itemToEdit ? itemToEdit.collectionId : collection?.id,
      title: item.title,
      description: item.description || undefined,
      attributes: item.attributes.map(({ value, attribute }) => ({ id: attribute.id, value })),
    };
    const apiMethod = itemToEdit ? api.updateItem.bind(api, itemToEdit.id) : api.postItem.bind(api);
    const { id, error } = await apiMethod(formData);
    if (error) {
      console.error(error);
      return;
    }
    navigate(ROUTES.ITEM({ id }));
  };

  return (
    <Container maxWidth="md">
      <h1 style={{ marginBottom: 0 }}>{itemToEdit ? "Edit" : "New"} item</h1>
      <Typography variant="body2" color="InactiveCaptionText" mt={0} mb={2}>
        {itemToEdit ? itemToEdit.collection.title : collection?.title}
      </Typography>
      <Grid container rowGap={2} columnSpacing={1} component="form" onSubmit={handleSubmit}>
        <Grid xs={12}>
          <TextField
            fullWidth
            label={
              <span>
                Title: <em>(required)</em>
              </span>
            }
            value={item.title}
            onChange={(e) => setItem((state) => ({ ...state, title: e.target.value }))}
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            multiline
            minRows={8}
            size="small"
            label="Description:"
            fullWidth
            value={item.description}
            onChange={(e) => setItem((state) => ({ ...state, description: e.target.value }))}
          />
        </Grid>

        <Grid xs={12}>
          <h3 style={{ marginBlock: "0.5rem" }}>Attachments:</h3>
          <Button variant="contained" component="label" endIcon={<FileUpload />}>
            Upload File
            <input type="file" hidden />
          </Button>
        </Grid>

        {item.attributes.map(({ value, attribute }) => {
          const Component = templates[attribute.type];
          return (
            <Grid xs={12} key={attribute.id}>
              <Component
                title={attribute.title + ":"}
                value={value}
                onChange={(e) => {
                  const newAttributes = [...item.attributes];
                  const attrToChange = newAttributes.find(
                    (itemAttribute) => itemAttribute.attribute.id === attribute.id
                  );
                  attrToChange!.value =
                    attribute.type === "checkbox" ? e.target.checked : e.target.value;
                  setItem((state) => ({ ...state, attributes: newAttributes }));
                }}
              />
            </Grid>
          );
        })}

        <Grid xs={12} mt={2} mb={8} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" endIcon={<Check />}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
