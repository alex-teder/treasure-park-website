import { Inventory } from "@mui/icons-material";
import { Avatar, Box, SxProps, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../router";
import { UserProfile } from "../../types";

export function CollectionListItem({
  collection,
}: {
  collection: UserProfile["collections"][number];
}) {
  const [isHovering, setIsHovering] = useState(false);
  const hoveringProps: SxProps = isHovering
    ? {
        transform: "scale(1.1)",
        boxShadow: "3px 3px 15px rgba(0, 0, 0, 0.3)",
      }
    : {};

  const category = collection.category ? collection.category.title : "Other";

  return (
    <>
      <Grid xs={12} md={4}>
        <Link
          to={ROUTES.COLLECTION({ id: collection.id })}
          style={{ textDecoration: "none" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Avatar
              sx={{
                height: "8rem",
                width: "8rem",
                mb: 1,
                transition: "all 0.2s ease-out",
                ...hoveringProps,
              }}
            >
              <Inventory fontSize="large" />
            </Avatar>
            <Typography fontWeight={700} sx={{ textDecoration: isHovering ? "underline" : "none" }}>
              {collection.title}
            </Typography>
            <Typography variant="caption">{collection.items.length} items</Typography>
            <Typography variant="body2">Category: {category}</Typography>
          </Box>
        </Link>
      </Grid>
    </>
  );
}
