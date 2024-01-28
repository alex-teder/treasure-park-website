import { OpenInNew } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "@/router";
import { SearchResult } from "@/types";
import { formatDate } from "@/utils/formatDate";

export function SearchListItem({ item }: { item: SearchResult }) {
  return (
    <Card>
      <CardHeader
        title={
          <Link to={ROUTES.ITEM(item.itemId)}>
            {item.title} <OpenInNew sx={{ fontSize: "1rem" }} />
          </Link>
        }
        subheader={
          <>
            <Link to={ROUTES.COLLECTION(item.collectionId)}>{item.collectionTitle}</Link> -{" "}
            <Link to={ROUTES.USER(item.userId)}>{"@" + item.username}</Link>
          </>
        }
      />
      <CardContent
        sx={{ pt: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <Typography variant="body2" color="grey">
          {formatDate(item.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}
