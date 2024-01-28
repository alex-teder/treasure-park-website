import { Avatar, CardContent, CardHeader, Divider } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "@/components/UserProvider";
import { ROUTES } from "@/router";
import { Item } from "@/types";
import { formatDate } from "@/utils/formatDate";

import { SingleCommentActions } from "./SingleCommentActions";

export function SingleComment({ comment }: { comment: Item["comments"][number] }) {
  const { user } = useContext(UserContext);

  const isOwner = Boolean(user?.isAdmin || user?.id === comment.author.id);

  return (
    <>
      <CardHeader
        avatar={<Avatar>U</Avatar>}
        title={
          <Link to={ROUTES.USER(comment.author.id)}>
            <b>@{comment.author.username}</b>
          </Link>
        }
        subheader={formatDate(comment.createdAt)}
        action={isOwner && <SingleCommentActions comment={comment} />}
      />
      <CardContent sx={{ fontSize: "0.875rem", pt: 0 }}>{comment.text}</CardContent>
      <Divider />
    </>
  );
}
