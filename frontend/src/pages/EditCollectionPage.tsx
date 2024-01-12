import {
  Add,
  Check,
  CheckBoxOutlined,
  Edit,
  Event,
  HelpOutline,
  Numbers,
  Remove,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactNode, useReducer } from "react";

export function EditCollectionPage() {
  const CUSTOM_FIELD_LIMIT = 3;

  interface CustomField {
    title: string;
  }

  const customFields = {
    smallText: { label: "Small text", icon: <Edit /> },
    bigText: { label: "Big text", icon: <Edit /> },
    number: { label: "Number", icon: <Numbers /> },
    checkbox: { label: "Checkbox", icon: <CheckBoxOutlined /> },
    date: { label: "Date", icon: <Event /> },
  };

  type CustomFieldsState = Record<keyof typeof customFields, CustomField[]>;

  interface CustomFieldsAction {
    type: "ADD" | "REMOVE" | "CHANGE";
    payload: { fieldType: keyof CustomFieldsState; fieldIndex?: number; titleValue?: string };
  }

  const reducer = (state: CustomFieldsState, action: CustomFieldsAction) => {
    const arrayToChange = [...state[action.payload.fieldType]];
    if (action.payload.fieldIndex !== undefined) {
      arrayToChange[action.payload.fieldIndex].title = action.payload.titleValue!;
    }
    switch (action.type) {
      case "ADD":
        return state[action.payload.fieldType].length === CUSTOM_FIELD_LIMIT
          ? state
          : {
              ...state,
              [action.payload.fieldType]: state[action.payload.fieldType].concat({ title: "" }),
            };
      case "REMOVE":
        return {
          ...state,
          [action.payload.fieldType]: state[action.payload.fieldType].slice(
            0,
            state[action.payload.fieldType].length - 1
          ),
        };
      case "CHANGE":
        return {
          ...state,
          [action.payload.fieldType]: arrayToChange,
        };

      default:
        return state;
    }
  };

  const initialState: CustomFieldsState = {
    smallText: [],
    bigText: [],
    number: [],
    checkbox: [],
    date: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container maxWidth="md">
      <h1>Edit collection</h1>
      <Grid
        container
        component="form"
        rowGap={2}
        columnSpacing={1}
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
        <Grid xs={12} sm={6}>
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <span>
                    Select category <em>(required)</em>
                  </span>
                }
              />
            )}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Autocomplete
            freeSolo
            multiple
            options={[]}
            renderInput={(params) => <TextField {...params} label="Select tags" />}
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
          />
        </Grid>
        <Grid xs={12}>
          <h3 style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "0.25rem" }}>
            Custom fields
            <Tooltip
              title={
                <Typography variant="caption">
                  You can choose the fields to be showcased on every item in your collection.
                </Typography>
              }
              placement="top"
            >
              <HelpOutline sx={{ fontSize: "1rem" }} />
            </Tooltip>
          </h3>
        </Grid>
        <Grid xs={12} sm={6}>
          {Object.entries(customFields).map(([key, { icon, label }]) => {
            const fieldType = key as unknown as keyof typeof customFields;

            return (
              <CustomFieldAdder
                key={key}
                icon={icon}
                label={label}
                titleValues={state[fieldType]}
                increment={() => dispatch({ type: "ADD", payload: { fieldType } })}
                decrement={() => dispatch({ type: "REMOVE", payload: { fieldType } })}
                change={(fieldIndex, titleValue) =>
                  dispatch({
                    type: "CHANGE",
                    payload: { fieldType, fieldIndex, titleValue },
                  })
                }
              />
            );
          })}
        </Grid>
        <Grid xs={12} mt={2} mb={8} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" endIcon={<Check />}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

function CustomFieldAdder({
  icon,
  label,
  titleValues,
  increment,
  decrement,
  change,
}: {
  icon?: ReactNode;
  label?: ReactNode;
  titleValues: { title: string }[];
  increment: () => void;
  decrement: () => void;
  change: (index: number, value: string) => void;
}) {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          {label}
        </Box>
        <Box width="100px" display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={decrement}>
            <Remove />
          </IconButton>
          {titleValues.length}
          <IconButton onClick={increment}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      {titleValues.map(({ title }, idx) => (
        <TextField
          key={idx}
          label={`${label} field ${idx + 1} title`}
          size="small"
          value={title}
          onChange={(e) => change(idx, e.target.value)}
        />
      ))}
    </Box>
  );
}
