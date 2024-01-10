import { TagCloud } from "react-tagcloud";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";

const mockData = [
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "MongoDB", count: 18 },
  { value: "CSS3", count: 20 },
];

export function PopularTags() {
  const navigate = useNavigate();

  return (
    <section>
      <h2 style={{ marginBottom: 0 }}>Popular Tags:</h2>
      <Box>
        <TagCloud
          tags={mockData}
          disableRandomColor
          minSize={15}
          maxSize={30}
          onClick={() => navigate(ROUTES.SEARCH)}
          onMouseOver={(_, e) => {
            const tag = e.target as unknown as HTMLElement;
            tag.style.textDecoration = "underline";
          }}
          onMouseOut={(_, e) => {
            const tag = e.target as unknown as HTMLElement;
            tag.style.textDecoration = "none";
          }}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </section>
  );
}
