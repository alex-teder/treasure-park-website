import { Typography } from "@mui/material";

export function BannerText() {
  return (
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
      Share your collections.
      <br />
      Explore and participate in discussions.
      <br />
      Join now!
    </Typography>
  );
}
