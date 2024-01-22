import { Tag as TagIcon } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "../../router";
import { Collection } from "../../types";

type CollectionTagListProps = {
  tags: Collection["collectionTags"];
};

export function CollectionTagList({ tags }: CollectionTagListProps) {
  if (!tags.length) return null;

  return (
    <ul style={{ padding: 0, listStyle: "none", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {tags.map(({ tag }) => (
        <li key={tag}>
          <Link to={ROUTES.SEARCH}>
            <Chip icon={<TagIcon />} label={tag} sx={{ borderRadius: 1 }} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
