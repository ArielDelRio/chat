import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";

export interface ContainerStyles {
  width?: string;
  height?: string;
  minHeight?: string;
  fullScreen?: boolean;
  offset?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

interface Props extends BoxProps {
  styles?: ContainerStyles;
}

const DEFAULT_STYLES = {
  width: "384px",
  height: "384px",
  minHeight: "480px",
};

const Container: React.FC<Props> = styled(Box)<Props>(({ styles }) => ({
  borderRadius: "3px",
  width: styles?.width || DEFAULT_STYLES.width,
  height: styles?.height || DEFAULT_STYLES.height,
  minHeight: styles?.minHeight || DEFAULT_STYLES.minHeight,
  backgroundColor: "white",
  position: "relative",
  zIndex: 1000,
  ...(styles?.fullScreen && {
    position: "fixed",
    top: styles.offset?.top || 0,
    left: styles.offset?.left || 0,
    right: styles.offset?.right || 0,
    bottom: styles.offset?.bottom || 0,
    width: "100%",
    height: "auto",
    minHeight: "auto",
  }),
}));

export default {
  Container,
};
