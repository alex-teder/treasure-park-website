declare module "react-tagcloud" {
  export interface Tag {
    value: string;
    count: number;
  }

  export interface TagCloudProps {
    tags: Tag[];
    disableRandomColor?: boolean;
    minSize?: number;
    maxSize: number;
    renderer?: (tag: Tag, size: number, key: number) => React.ReactNode;
    onClick?: (tag: Tag) => unknown;
    onMouseOver?: (tag: Tag, event: React.SyntheticEvent<HTMLElement, MouseEvent>) => unknown;
    onMouseOut?: (tag: Tag, event: React.SyntheticEvent<HTMLElement, MouseEvent>) => unknown;
    style?: React.CSSProperties;
  }

  export const TagCloud: React.ComponentType<TagCloudProps>;
}
