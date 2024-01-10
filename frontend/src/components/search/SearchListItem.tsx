import { Image, OpenInNew } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function SearchListItem() {
  return (
    <Card>
      <CardHeader
        title={
          <Link to="/users/123/collections/321/items/3875">
            My Awesome Item <OpenInNew sx={{ fontSize: "1rem" }} />
          </Link>
        }
        subheader={<Link to="/users/123">@username</Link>}
      />
      <CardContent
        sx={{ pt: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <Avatar variant="square" sx={{ height: 75, width: 75 }}>
          <Image />
        </Avatar>
        <Typography variant="body2" color="grey">
          12 September 2023, 14:45
        </Typography>
      </CardContent>
    </Card>
  );
}
