import { Container, Typography } from "@mui/material";
import MuiMarkdown from "mui-markdown";
import { Link } from "react-router-dom";

const sampleMarkdown = `
# Magic Potion

Unleash the extraordinary with our enchanting Magic Potion! Crafted by mystical alchemists in the heart of the enchanted forest, this potion is a concoction of rare herbs and magical essences.

## Features:

- **Glowing Elixir:** The potion emits a soft, mesmerizing glow, casting an ethereal light in its surroundings.

- **Instant Revitalization:** A sip of the Magic Potion revitalizes your energy, making you feel rejuvenated and ready for any adventure.

- **Invisibility Boost:** With a whispered incantation, the potion grants a brief moment of invisibility, perfect for slipping past tricky situations.

- **Flavorful Essence:** The potion boasts a delightful taste with hints of elderberry, starlight, and a touch of whimsy.

## Usage Instructions:

1. Uncork the potion bottle with care.
2. Inhale the enchanting aroma.
3. Take a small sip for an immediate energy boost.
4. For invisibility, recite the provided incantation while consuming.

**Caution:** Do not consume more than the recommended dosage. Overconsumption may lead to unexpected magical phenomena.

Get ready to embark on a magical journey with the extraordinary Magic Potion. Order yours today and experience the wonders it holds!
`;

export function CollectionPage() {
  return (
    <Container>
      <Typography variant="h5" fontWeight={700} component="p">
        My awesome collection
      </Typography>
      <p>
        Author: <Link to={"/users/548493"}>@username</Link>
      </p>
      <p>
        Category: <Link to={"#"}>Magic Potions</Link>
      </p>
      <div style={{ fontSize: "0.875rem" }}>
        <MuiMarkdown
          overrides={{
            h1: {
              component: "h1",
            },
          }}
        >
          {sampleMarkdown}
        </MuiMarkdown>
      </div>
    </Container>
  );
}
