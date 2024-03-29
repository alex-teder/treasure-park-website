import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  PersonAdd as SignupIcon,
  Shield as AdminIcon,
} from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/api/";
import { UserContext } from "@/components/UserProvider";
import { ROUTES } from "@/router";

export function UserButton() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await api.logOut();
    setUser(null);
    navigate(ROUTES.ROOT);
  };

  const noAuthMenuOptions = [
    {
      label: "Sign up",
      icon: <SignupIcon fontSize="small" color="primary" />,
      action: () => navigate(ROUTES.SIGNUP),
    },
    {
      label: "Log in",
      icon: <LoginIcon fontSize="small" color="primary" />,
      action: () => navigate(ROUTES.LOGIN),
    },
  ];

  const authMenuOptions = [
    {
      label: "Log out",
      icon: <LogoutIcon fontSize="small" color="primary" />,
      action: handleLogOut,
    },
  ];

  const currentMenuOptions = user ? authMenuOptions : noAuthMenuOptions;

  const isAdmin = user && user.isAdmin;

  return (
    <>
      <IconButton onClick={handleClick}>
        {isAdmin ? <AdminIcon color="primary" /> : <PersonIcon color="primary" />}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 16,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        disableScrollLock
      >
        {currentMenuOptions.map(({ label, icon, action }, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              handleClose();
              action();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
