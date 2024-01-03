import { Box, Button } from "@mui/material";

export function NavBar() {
  const navItems = [{ label: "Home" }, { label: "Search" }, { label: "My collections" }];

  return (
    <nav>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {navItems.map(({ label }) => (
          <Button variant="text" size="large" key={label} sx={{ p: 2 }}>
            {label}
          </Button>
        ))}
      </Box>
    </nav>
  );
}
