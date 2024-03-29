import { Check } from "@mui/icons-material";
import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Dayjs } from "dayjs";
import { ChangeEvent, FC, FormEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "@/api";
import { CustomBigText } from "@/components/edit-item/custom-fields/CustomBigText";
import { CustomCheckbox } from "@/components/edit-item/custom-fields/CustomCheckbox";
import { CustomDate } from "@/components/edit-item/custom-fields/CustomDate";
import { CustomNumber } from "@/components/edit-item/custom-fields/CustomNumber";
import { CustomSmallText } from "@/components/edit-item/custom-fields/CustomSmallText";
import {
  CustomDateFieldProps,
  CustomFieldProps,
  DATE_STORING_FORMAT,
} from "@/components/edit-item/custom-fields/types";
import { ImageUploader } from "@/components/edit-item/ImageUploader";
import { ROUTES } from "@/router";
import { Collection, CustomAttributeType, CustomAttributeValue, Item } from "@/types";
import { itemFormSchema } from "@/zod/forms";

const templates: Record<CustomAttributeType, FC<CustomFieldProps> | FC<CustomDateFieldProps>> = {
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
  const emptyCollectionAttributes = collection && collection.attributes;

  const initialState = {
    title: itemToEdit?.title || "",
    description: itemToEdit?.description || "",
    attributes:
      attributesWithValue ||
      emptyCollectionAttributes?.map((attribute) => ({
        attribute,
        value: defaultValues[attribute.type],
      })) ||
      [],
    attachments: itemToEdit?.attachments.map(({ url }) => url) || [],
  };

  const [item, setItem] = useState<{
    title: string;
    description: string;
    attributes: Item["itemAttributes"];
    attachments: string[];
  }>(initialState);

  const [error, setError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const valueParsers: Record<CustomAttributeType, (e: any) => CustomAttributeValue> = {
    smallText: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    bigText: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    number: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    checkbox: (e: ChangeEvent<HTMLInputElement>) => e.target.checked,
    date: (v: Dayjs | null) => (!v || !v.isValid() ? "" : v.format(DATE_STORING_FORMAT)),
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = {
      collectionId: itemToEdit ? itemToEdit.collectionId : collection?.id,
      title: item.title,
      description: item.description || undefined,
      attributes: item.attributes.map(({ value, attribute }) => ({ id: attribute.id, value })),
      attachments: item.attachments,
    };
    const validation = itemFormSchema.safeParse(formData);
    if (!validation.success) {
      setError("Please fill all required fields.");
      return;
    }
    const apiMethod = itemToEdit ? api.updateItem.bind(api, itemToEdit.id) : api.postItem.bind(api);
    setError("");
    const { id, error } = await apiMethod(formData);
    if (error) {
      console.error(error);
      setError("An error occured.");
      return;
    }
    navigate(ROUTES.ITEM(id));
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
          <ImageUploader
            attachments={item.attachments}
            setAttachments={(urls) => setItem((state) => ({ ...state, attachments: urls }))}
          />
        </Grid>

        {item.attributes.map(({ value, attribute }) => {
          const Component = templates[attribute.type];
          return (
            <Grid xs={12} key={attribute.id}>
              <Component
                title={attribute.title + ":"}
                value={value}
                onChange={(event) => {
                  const newAttributes = [...item.attributes];
                  const attrToChange = newAttributes.find(
                    (itemAttribute) => itemAttribute.attribute.id === attribute.id
                  );
                  attrToChange!.value = valueParsers[attribute.type](event);
                  setItem((state) => ({ ...state, attributes: newAttributes }));
                }}
              />
            </Grid>
          );
        })}

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
