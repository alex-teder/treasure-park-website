import { Box, Button } from "@mui/material";
import { ROUTES } from "../router";
import { Link, useNavigate } from "react-router-dom";

export function NavBar({ closeDrawer }: { closeDrawer: () => void }) {
  const navItems = [
    { label: "Home", path: ROUTES.ROOT },
    { label: "Search", path: ROUTES.SEARCH },
    { label: "My collections", path: "/users/2049685" },
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
          <Link to={path} key={label} style={{ display: "contents" }}>
            <Button
              variant="text"
              size="large"
              sx={{ p: 2 }}
              onClick={() => {
                closeDrawer();
                if (path) {
                  navigate(path);
                }
              }}
            >
              {label}
            </Button>
          </Link>
        ))}
      </Box>
    </nav>
  );
}
