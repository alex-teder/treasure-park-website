import {
  Favorite as LikeIconFilled,
  FavoriteBorder as LikeIconOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../api";
import { ROUTES } from "../router";
import { UserContext } from "./UserProvider";

type LikeButtonProps = {
  initialLike: boolean;
  initialCount: number;
  itemId: number;
};

export function LikeButton({ initialLike, initialCount, itemId }: LikeButtonProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [like, setLike] = useState(initialLike);
  const [isCooldown, setIsCooldown] = useState(false);
  const currentCount = initialLike ? initialCount - 1 + Number(like) : initialCount + Number(like);

  const handleClick = () => {
    if (!user) return navigate(ROUTES.SIGNUP);
    if (isCooldown) return;
    setIsCooldown(true);
    if (like) {
      api.unlikeItem(itemId);
    } else {
      api.likeItem(itemId);
    }
    setLike((v) => !v);
    setTimeout(() => setIsCooldown(false), 500);
  };

  return (
    <>
      <IconButton color={like ? "error" : "inherit"} onClick={handleClick}>
        {like ? <LikeIconFilled /> : <LikeIconOutlined />}
      </IconButton>
      {currentCount}
    </>
  );
}
