import { Image, OpenInNew } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router";

export function SearchListItem() {
  const COLLECTION_NAME = "My Awesome Collection";
  const COLLECTION_LINK = ROUTES.COLLECTION({ id: 123 });
  const USER_NAME = "@username";
  const USER_LINK = ROUTES.USER({ id: 123 });
  const ITEM_NAME = "My new item";
  const ITEM_LINK = ROUTES.ITEM({ id: 123 });
  const IMAGE_HREF = "https://source.unsplash.com/featured/";
  const CREATED_AT_CAPTION = "12 September 2023, 14:45";

  return (
    <Card>
      <CardHeader
        title={
          <Link to={ITEM_LINK}>
            {ITEM_NAME} <OpenInNew sx={{ fontSize: "1rem" }} />
          </Link>
        }
        subheader={
          <>
            <Link to={COLLECTION_LINK}>{COLLECTION_NAME}</Link> -{" "}
            <Link to={USER_LINK}>{USER_NAME}</Link>
          </>
        }
      />
      <CardContent
        sx={{ pt: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <Avatar variant="square" sx={{ height: 75, width: 75 }} src={IMAGE_HREF}>
          <Image />
        </Avatar>
        <Typography variant="body2" color="grey">
          {CREATED_AT_CAPTION}
        </Typography>
      </CardContent>
    </Card>
  );
}
