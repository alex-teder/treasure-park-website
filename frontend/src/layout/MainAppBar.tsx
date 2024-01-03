import { useState } from "react";
import { AppBar, Toolbar, Drawer, Box, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { NavBar } from "./NavBar";
import { RightSideToolbar } from "./RightSideToolbar";

export function MainAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => setIsDrawerOpen((v) => !v);

  return (
    <AppBar elevation={0} color="transparent" position="static">
      <Toolbar sx={{ display: "inline-flex", justifyContent: "space-between" }}>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NavBar />
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ p: 2, display: { sm: "none" } }}>
          <MenuIcon color="primary" />
        </IconButton>
        <RightSideToolbar />
      </Toolbar>

      <Drawer
        container={window.document.body}
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", paddingBlock: "1rem", width: "75%" },
        }}
      >
        <NavBar />
      </Drawer>
    </AppBar>
  );
}
