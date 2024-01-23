import { useTheme } from "@mui/material";
import { Container, Divider } from "@mui/material";
import { UIEventHandler, useState } from "react";

import { NewCommentField } from "./NewCommentField";
import { SingleComment } from "./SingleComment";

export function CommentSection() {
  const OVERLAY_HEIGHT = 150;
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { mode } = useTheme().palette;
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
      <Divider />
      <div
        style={{ maxHeight: 450, overflow: "auto", position: "relative" }}
        onScroll={handleScroll}
      >
        <div style={{ marginBottom: `${-OVERLAY_HEIGHT}px` }}>
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
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
      <NewCommentField />
    </Container>
  );
}
