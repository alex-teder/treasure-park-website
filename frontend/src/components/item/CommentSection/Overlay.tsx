import { useTheme } from "@mui/material";

type OverlayProps = {
  isVisible: boolean;
  height: number;
};

export function Overlay({ isVisible, height }: OverlayProps) {
  const { mode } = useTheme().palette;

  return (
    <div
      style={{
        display: isVisible ? "none" : "block",
        position: "sticky",
        bottom: 0,
        width: "100%",
        height: `${height}px`,
        background: `linear-gradient(0deg, hsla(0,0%,${
          mode === "dark" ? 11 : 100
        }%,1) 0%, hsla(0,0%,${mode === "dark" ? 11 : 100}%,0) 100%)`,
        pointerEvents: "none",
      }}
    />
  );
}
