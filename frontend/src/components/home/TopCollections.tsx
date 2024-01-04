import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function TopCollections() {
  return (
    <section>
      <Box mb={2}>
        <h2>Top collections:</h2>
        <ol>
          <li>
            <Link to={"/"}>
              <Typography variant="body2">1. My Awesome collection - @username</Typography>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <Typography variant="body2">2. Lorem ipsum - @username</Typography>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <Typography variant="body2">3. Ipsum lorem - @username</Typography>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <Typography variant="body2">4. Lorem lorem - @username</Typography>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <Typography variant="body2">5. Ipsum ipsum - @username</Typography>
            </Link>
          </li>
        </ol>
      </Box>
    </section>
  );
}
