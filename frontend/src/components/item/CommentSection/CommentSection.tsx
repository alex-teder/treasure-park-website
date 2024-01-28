import { Container, Divider } from "@mui/material";
import { UIEventHandler, useEffect, useState } from "react";

import { useRefreshComments } from "@/hooks/useRefreshComments";
import { Item } from "@/types";

import { NewCommentField } from "./NewCommentField";
import { Overlay } from "./Overlay";
import { SingleComment } from "./SingleComment";
import { UpdatePopup } from "./UpdatePopup";

const OVERLAY_HEIGHT = 150;

export function CommentSection({
  comments,
  itemId,
}: {
  comments: Item["comments"];
  itemId: number;
}) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { isCurrent, difference } = useRefreshComments(itemId, comments.length);

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

        <UpdatePopup areCommentsCurrent={isCurrent} difference={difference} />

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

          <Overlay isVisible={isAtBottom} height={OVERLAY_HEIGHT} />
        </div>

        <NewCommentField itemId={itemId} />
      </>
    </Container>
  );
}
