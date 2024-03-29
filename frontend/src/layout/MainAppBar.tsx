import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, Drawer, IconButton,Toolbar } from "@mui/material";
import { useState } from "react";

import { NavBar } from "./NavBar";
import { RightSideToolbar } from "./RightSideToolbar";

export function MainAppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => setIsDrawerOpen((v) => !v);
  const closeDrawer = () => setIsDrawerOpen(false);

  const navBar = <NavBar closeDrawer={closeDrawer} />;

  return (
    <AppBar elevation={0} color="transparent" position="static">
      <Toolbar sx={{ display: "inline-flex", justifyContent: "space-between" }}>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>{navBar}</Box>
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
        {navBar}
      </Drawer>
    </AppBar>
  );
}
