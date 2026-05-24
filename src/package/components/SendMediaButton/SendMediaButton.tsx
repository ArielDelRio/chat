import { Box, IconButton, colors, styled } from "@mui/material";
import { useRef } from "react";
import { useChatDispatch } from "@/package/context/Chat/context";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props {
  onSelectedFile: (file: File) => void;
}

const ALLOWED_MEDIA_TYPES = ["JPG", "JPEG", "PNG", "MP4", "QUICKTIME", "PDF"];
const MAX_FILE_SIZE_MB = 150;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const SendMediaButton = ({ onSelectedFile }: Props) => {
  const { setAlert } = useChatDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickSendMediaMessage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (
        !ALLOWED_MEDIA_TYPES.includes(file.type.split("/")[1].toUpperCase())
      ) {
        setAlert({
          message: `Invalid file type, ${file.type}`,
          type: "error",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setAlert({
          message: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
          type: "error",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      onSelectedFile(files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Box
      border={"1px solid #ccc"}
      sx={{
        bgcolor: colors.grey["100"],
        borderRight: "none",
        alignContent: "center",
      }}
    >
      <IconButton onClick={handleClickSendMediaMessage}>
        <AddToPhotosIcon />
      </IconButton>
      <VisuallyHiddenInput
        type="file"
        accept="image/*,video/*,.pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Box>
  );
};
