import { Box, Button } from "@mui/material";
import { ROUTES } from "../router";
import { useNavigate } from "react-router-dom";

export function NavBar({ handleDrawerToggle }: { handleDrawerToggle: () => void }) {
  const navItems = [
    { label: "Home", path: ROUTES.ROOT },
    { label: "Search", path: ROUTES.SEARCH },
    { label: "My collections" },
  ];
  const navigate = useNavigate();

  return (
    <nav>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {navItems.map(({ label, path }) => (
          <Button
            variant="text"
            size="large"
            key={label}
            sx={{ p: 2 }}
            onClick={() => {
              handleDrawerToggle();
              if (path) {
                navigate(path);
              }
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </nav>
  );
}
