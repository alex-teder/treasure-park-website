import { Inventory } from "@mui/icons-material";
import { Avatar, SxProps, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";

export function CollectionListItem() {
  const [isHovering, setIsHovering] = useState(false);
  const hoveringProps: SxProps = isHovering
    ? {
        transform: "scale(1.1)",
        boxShadow: "3px 3px 15px rgba(0, 0, 0, 0.3)",
      }
    : {};

  return (
    <>
      <Grid xs={12} md={4}>
        <Link
          to={"/users/123/collections/321"}
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
              My Awesome collection
            </Typography>
            <Typography variant="caption">15 items</Typography>
            <Typography variant="body2">Category: Books</Typography>
          </Box>
        </Link>
      </Grid>
    </>
  );
}
