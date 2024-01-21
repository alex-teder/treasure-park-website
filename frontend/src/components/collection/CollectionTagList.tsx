import { Tag as TagIcon } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

export function CollectionTagList() {
  const sampleTags = [
    { title: "Enchantments" },
    { title: "Fantasy Collectibles" },
    { title: "Sorcery" },
    { title: "Arcana" },
    { title: "Esoteric Treasures" },
  ];

  return (
    <ul style={{ padding: 0, listStyle: "none", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {sampleTags.map(({ title }) => (
        <li key={title}>
          <Link to={"#"}>
            <Chip icon={<TagIcon />} label={title} sx={{ borderRadius: 1 }} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
