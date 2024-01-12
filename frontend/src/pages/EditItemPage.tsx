import { Check, FileUpload } from "@mui/icons-material";
import { Button, Checkbox, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ChangeEventHandler, FC, useState } from "react";

interface CustomFieldProps {
  title: string;
  value: string | boolean;
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

type FieldType = "smallText" | "bigText" | "number" | "checkbox" | "date";
type CustomFieldValue = string | boolean;

type CustomField = {
  title: string;
  type: FieldType;
  value: CustomFieldValue;
};

const mockCustomFields: CustomField[] = [
  { title: "sm1", type: "smallText", value: "" },
  {
    title: "sm2",
    type: "smallText",
    value: "HellO!",
  },
  {
    title: "bt",
    type: "bigText",
    value: "hi!!!!!!!!!!!",
  },
  {
    title: "cb1",
    type: "checkbox",
    value: true,
  },
  {
    title: "cb2",
    type: "checkbox",
    value: false,
  },
];

type CustomFieldState = Record<string, { type: FieldType; value: CustomFieldValue }>;

export function EditItemPage() {
  const templates: Record<FieldType, FC<CustomFieldProps>> = {
    smallText: CustomSmallText,
    bigText: CustomBigText,
    number: CustomNumber,
    checkbox: CustomCheckbox,
    date: () => null,
  };

  const initialState = mockCustomFields.reduce<CustomFieldState>((map, field) => {
    const { type, value } = field;
    map[field.title] = { type, value };
    return map;
  }, {});

  const [customFields, setCustomFields] = useState<CustomFieldState>(initialState);

  const handleChange = (fieldTitle: string, newValue: CustomFieldValue) => {
    setCustomFields((state) => {
      const newState = { ...state };
      newState[fieldTitle].value = newValue;
      return newState;
    });
  };

  return (
    <Container maxWidth="md">
      <h1>Edit item</h1>
      <Grid
        container
        rowGap={2}
        columnSpacing={1}
        component="form"
        onSubmit={(e) => e.preventDefault()}
      >
        <Grid xs={12}>
          <TextField
            fullWidth
            label={
              <span>
                Title: <em>(required)</em>
              </span>
            }
          />
        </Grid>
        <Grid xs={12}>
          <TextField multiline minRows={8} size="small" label="Description:" fullWidth />
        </Grid>
        <Grid xs={12}>
          <h3 style={{ marginBlock: "0.5rem" }}>Attachments:</h3>
          <Button variant="contained" component="label" endIcon={<FileUpload />}>
            Upload File
            <input type="file" hidden />
          </Button>
        </Grid>

        {Object.entries(customFields).map(([key, { type, value }]) => {
          const Component = templates[type];
          return (
            <Grid xs={12} key={key}>
              <Component
                title={key}
                value={value}
                onChange={(e) =>
                  handleChange(key, type === "checkbox" ? e.target.checked : e.target.value)
                }
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
