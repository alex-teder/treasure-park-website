import {
  Box,
  Container,
  ThemeProvider as MuiThemeProvider,
  useTheme,
  PaletteOptions,
  createTheme,
} from "@mui/material";
import bannerImg from "/src/assets/banner.jpg";
import { BannerText } from "./BannerText";
import { BannerEmailForm } from "./BannerEmailForm";

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
