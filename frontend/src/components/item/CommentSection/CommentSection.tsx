import { Refresh } from "@mui/icons-material";
import { Box, Button, Collapse, useTheme } from "@mui/material";
import { Container, Divider } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { UIEventHandler, useEffect, useState } from "react";

import { useRefreshComments } from "../../../hooks/useRefreshComments";
import { Item } from "../../../types";
import { NewCommentField } from "./NewCommentField";
import { SingleComment } from "./SingleComment";

export function CommentSection({
  comments,
  itemId,
}: {
  comments: Item["comments"];
  itemId: number;
}) {
  const queryClient = useQueryClient();
  const { isCurrent, difference } = useRefreshComments(itemId, comments.length);
  const OVERLAY_HEIGHT = 150;
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { mode } = useTheme().palette;

  useEffect(() => {
    const element = document.querySelector("#scrollable")!;
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 32) {
      setIsAtBottom(true);
    }
  }, []);

  const handleScroll: UIEventHandler = (e) => {
    const element = e.target as HTMLDivElement;
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 32) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  return (
    <Container>
      <>
        <Divider />
        <Collapse in={!isCurrent}>
          <Box display="flex" justifyContent="center" p={1}>
            <Button
              color="inherit"
              size={"small"}
              endIcon={<Refresh />}
              onClick={() => queryClient.invalidateQueries()}
            >
              new comments {difference && `(${difference})`}
            </Button>
          </Box>
        </Collapse>
        <div
          style={{ maxHeight: 450, overflow: "auto", position: "relative" }}
          id="scrollable"
          onScroll={handleScroll}
        >
          <div style={{ marginBottom: isAtBottom ? 0 : `${-OVERLAY_HEIGHT}px` }}>
            {comments.map((comment) => (
              <SingleComment key={comment.id} comment={comment} />
            ))}
          </div>
          <div
            style={{
              display: isAtBottom ? "none" : "block",
              position: "sticky",
              bottom: 0,
              width: "100%",
              height: `${OVERLAY_HEIGHT}px`,
              background: `linear-gradient(0deg, hsla(0,0%,${
                mode === "dark" ? 11 : 100
              }%,1) 0%, hsla(0,0%,${mode === "dark" ? 11 : 100}%,0) 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>
        <NewCommentField itemId={itemId} />
      </>
    </Container>
  );
}
