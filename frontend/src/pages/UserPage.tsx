import { Inventory as InventoryIcon } from "@mui/icons-material";
import { Avatar, Box, Container, SxProps, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";

export function UserPage() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
        mt={2}
        mb={6}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Avatar sx={{ height: "5rem", width: "5rem" }} />
        <Typography variant="h5" component="h1">
          @username-123
        </Typography>
      </Box>
      <h2>Personal collections:</h2>
      <CollectionList />
    </Container>
  );
}

function CollectionList() {
  return (
    <Grid container rowSpacing={8} columnSpacing={4} my={4}>
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
    </Grid>
  );
}

function CollectionListItem() {
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
              <InventoryIcon fontSize="large" />
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
