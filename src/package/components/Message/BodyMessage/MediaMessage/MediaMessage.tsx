import {
  Box,
  colors,
  IconButton,
  Modal,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import { Media } from "@twilio/conversations";
import { useGetMediaMessageUrl } from "../../useGetMediaMessageUrl";
import { useState } from "react";
import { downloadMediaFromUrl } from "@/package/utils";
import Close from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface Props {
  media: Media;
  small?: boolean;
}

const Image = styled("img")<{ small?: boolean }>(({ small }) => ({
  height: small ? "100px" : "200px",
  width: small ? "6em" : "12em",
  borderRadius: "10px",
  objectFit: "cover",
  cursor: "pointer",
}));

const FullImage = styled("img")(() => ({
  maxWidth: "85%",
  maxHeight: "85%",
  objectFit: "contain",
}));

const Video = styled("video")(() => ({
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  cursor: "pointer",
}));

const PDFContainer = styled(Box)<{ small?: boolean }>(({ small }) => ({
  borderRadius: "10px",
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  height: small ? "100px" : "200px",
  width: small ? "6em" : "12em",
}));

export const MediaMessage = ({ media, small }: Props) => {
  const { fileName, mediaUrl, isLoading, error, type } =
    useGetMediaMessageUrl(media);

  const [open, setOpen] = useState(false);

  const handleClickMedia = (isOpening: boolean) => {
    setOpen(isOpening);
  };

  const handleDownloadPdf = async (mediaUrl: string) => {
    await downloadMediaFromUrl(mediaUrl, fileName);
  };

  if (error)
    return (
      <Typography variant="body2" color={"error"}>
        {error}
      </Typography>
    );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading || !mediaUrl ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={small ? "6em" : "12em"}
            height={small ? "100px" : "200px"}
            sx={{ borderRadius: "10px" }}
          />
        ) : (
          <>
            {type === "image" && (
              <Image
                src={mediaUrl}
                alt="Media"
                small={small}
                onClick={() => handleClickMedia(true)}
              />
            )}
            {type === "video" && (
              <Box
                sx={{
                  aspectRatio: "16 / 9",
                  cursor: "pointer",
                }}
              >
                <Video playsInline controls>
                  <source src={mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </Video>
              </Box>
            )}
            {type === "application" && (
              <PDFContainer
                small={small}
                onClick={() => handleDownloadPdf(mediaUrl!)}
              >
                <PictureAsPdfIcon
                  fontSize="large"
                  sx={{
                    color: colors.red["600"],
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    marginTop: 1,
                    textAlign: "center",
                    color: "#333",
                  }}
                >
                  {fileName || "PDF File"}
                </Typography>
              </PDFContainer>
            )}
            {type === "unknown" && (
              <Box>
                <Typography>Unknown media type</Typography>
              </Box>
            )}
            <Modal
              open={open}
              onClose={() => handleClickMedia(false)}
              slotProps={{
                backdrop: {
                  sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => handleClickMedia(false)}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    color: "white",
                  }}
                  onClick={() => handleClickMedia(false)}
                >
                  <Close />
                </IconButton>
                {type === "image" && (
                  <FullImage
                    sx={{
                      cursor: "auto",
                    }}
                    src={mediaUrl!}
                    alt={fileName || "Media"}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </Box>
            </Modal>
          </>
        )}
      </Box>
    </>
  );
};
