import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  ThemeProvider as MuiThemeProvider,
  useTheme,
  PaletteOptions,
  createTheme,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "@mui/icons-material";
import { ROUTES } from "../../router";
import { useState } from "react";

export function NoAuthBanner() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const theme = useTheme();
  const scopedPalette: PaletteOptions = {
    mode: "light",
    primary: { main: "#ffffff" },
    secondary: { main: "#ffffff" },
    background: { default: "#ffffff", paper: "#ffffff" },
  };
  const scopedTheme = createTheme({
    ...theme,
    palette: scopedPalette,
  });

  return (
    <MuiThemeProvider theme={scopedTheme}>
      <Box
        sx={{
          backgroundImage: "url(/src/assets/banner.jpg)",
        }}
      >
        <Box py={4} bgcolor="rgba(0, 0, 0, 0.5)">
          <Container maxWidth={false}>
            <Typography
              fontWeight={700}
              color="white"
              component="p"
              sx={{
                fontSize: "1.5rem",
                "@media (min-width: 450px)": {
                  fontSize: "2rem",
                },
                "@media (min-width: 700px)": {
                  fontSize: "2.5rem",
                },
                "@media (min-width: 900px)": {
                  fontSize: "3rem",
                },
              }}
              pb={2}
            >
              Endless memories.
              <br />
              Endless connections.
              <br />
              Start sharing now
            </Typography>
            <Box
              component="form"
              display="flex"
              gap={2}
              flexWrap="wrap"
              onSubmit={(e) => e.preventDefault()}
            >
              <Card sx={{ maxWidth: "fit-content" }}>
                <TextField
                  size="small"
                  placeholder="Enter your email:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Card>
              <Button
                type="submit"
                variant="contained"
                endIcon={<ArrowRightIcon />}
                sx={{ border: "1px solid rgba(0,0,0,0.2)" }}
                onClick={() => {
                  navigate(ROUTES.SIGNUP, { state: email });
                }}
              >
                Sign up
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}
