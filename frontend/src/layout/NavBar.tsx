import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../components/UserProvider";
import { ROUTES } from "../router";

export function NavBar({ closeDrawer }: { closeDrawer: () => void }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const navItems = [
    { label: "Home", path: ROUTES.ROOT },
    { label: "Search", path: ROUTES.SEARCH },
    {
      label: "My collections",
      path: user ? ROUTES.USER({ id: user.id }) : ROUTES.LOGIN,
    },
  ];

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
