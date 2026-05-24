import { Box, Button, Typography } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";

interface Props {
  body: string;
  onClickVideoButton: () => void;
}

export const VideoButtonMessage = ({ body, onClickVideoButton }: Props) => {
  return (
    <Button
      onClick={onClickVideoButton}
      variant="outlined"
      color="primary"
      startIcon={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            padding: 0.6,
            backgroundColor: "rgba(200, 200, 200, 0.4)",
          }}
        >
          <VideocamIcon />
        </Box>
      }
    >
      <Typography variant={"body2"}>{body}</Typography>
    </Button>
  );
};
