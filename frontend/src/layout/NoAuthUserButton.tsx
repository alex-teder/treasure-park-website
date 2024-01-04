import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Login, PersonAdd, Person as PersonIcon } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router";

export function NoAuthUserButton() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <PersonIcon color="primary" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
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
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(ROUTES.SIGNUP);
          }}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" color="primary" />
          </ListItemIcon>
          Sign up
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(ROUTES.LOGIN);
          }}
        >
          <ListItemIcon>
            <Login fontSize="small" color="primary" />
          </ListItemIcon>
          Log in
        </MenuItem>
      </Menu>
    </>
  );
}
