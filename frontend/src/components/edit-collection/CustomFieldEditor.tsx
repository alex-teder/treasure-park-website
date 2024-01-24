import {
  Add as PlusIcon,
  CheckBoxOutlined,
  Edit,
  Event,
  HelpOutline as TooltipIcon,
  Numbers,
  Remove as MinusIcon,
} from "@mui/icons-material";
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";

import { Collection, CustomAttributeType } from "../../types";
import { findLastIndex } from "../../utils/findLast";
import { getRandomNumber } from "../../utils/getRandomNumber";

type CustomFieldEditorProps = {
  attributes: Collection["attributes"];
  setAttributes: (newState: Collection["attributes"]) => void;
  mode: "creating" | "editing";
};

export function CustomFieldEditor({ attributes, setAttributes, mode }: CustomFieldEditorProps) {
  const MAX_FIELDS_OF_TYPE = 3;

  const customFields = {
    smallText: { label: "Small text", icon: <Edit /> },
    bigText: { label: "Big text", icon: <Edit /> },
    number: { label: "Number", icon: <Numbers /> },
    checkbox: { label: "Checkbox", icon: <CheckBoxOutlined /> },
    date: { label: "Date", icon: <Event /> },
  };

  if (mode === "editing" && attributes.length === 0) return null;

  return (
    <>
      <h3 style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "0.25rem" }}>
        Custom fields
        <Tooltip
          disableFocusListener
          enterTouchDelay={0}
          title={
            <Typography variant="caption">
              You can choose the fields to be showcased on every item in your collection.
              <br />
              <br />
              Note: You can't add or delete these fields after submitting the collection.
            </Typography>
          }
          placement="top"
        >
          <TooltipIcon sx={{ fontSize: "1rem" }} />
        </Tooltip>
      </h3>

      {Object.keys(customFields).map((key) => (
        <Box key={key}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700} display="flex" alignItems="center" gap={1} py={1}>
              {customFields[key as CustomAttributeType].icon}
              {customFields[key as CustomAttributeType].label}
            </Typography>
            {mode === "creating" && (
              <Box
                display="flex"
                minWidth={"115px"}
                alignItems="center"
                justifyContent="space-between"
              >
                <IconButton
                  onClick={() => {
                    const indexToDelete = findLastIndex(attributes, ({ type }) => type === key);
                    if (indexToDelete === undefined) return;
                    setAttributes(
                      attributes.slice(0, indexToDelete).concat(attributes.slice(indexToDelete + 1))
                    );
                  }}
                >
                  <MinusIcon />
                </IconButton>
                {attributes.filter(({ type }) => type === (key as CustomAttributeType)).length}
                <IconButton
                  disabled={
                    attributes.filter(({ type }) => type === (key as CustomAttributeType)).length >=
                    MAX_FIELDS_OF_TYPE
                  }
                  onClick={() =>
                    setAttributes(
                      [...attributes].concat({
                        id: getRandomNumber(),
                        title: "",
                        type: key as CustomAttributeType,
                      })
                    )
                  }
                >
                  <PlusIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {attributes
            .filter(({ type }) => type === key)
            .map(({ id, title }, idx) => (
              <TextField
                key={idx}
                fullWidth
                label={
                  <span>
                    {customFields[key as CustomAttributeType].label +
                      " field " +
                      (idx + 1) +
                      " title "}
                    <em style={{ fontSize: "0.8rem" }}>(required)</em>
                  </span>
                }
                sx={{ my: 1 }}
                value={title}
                onChange={(e) =>
                  setAttributes(
                    attributes.map((attr) => {
                      if (attr.id === id) return { ...attr, title: e.target.value };
                      return attr;
                    })
                  )
                }
              />
            ))}
        </Box>
      ))}
    </>
  );
}
