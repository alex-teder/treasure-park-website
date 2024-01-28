import {
  Box,
  Container,
  createTheme,
  PaletteOptions,
  ThemeProvider as MuiThemeProvider,
  useTheme,
} from "@mui/material";

import bannerImg from "@/assets/banner.jpg";

import { BannerEmailForm } from "./BannerEmailForm";
import { BannerText } from "./BannerText";

export function NoAuthBanner() {
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
          backgroundImage: `url(${bannerImg})`,
        }}
      >
        <Box py={4} bgcolor="rgba(0, 0, 0, 0.5)">
          <Container maxWidth={false}>
            <BannerText />
            <BannerEmailForm />
          </Container>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}
