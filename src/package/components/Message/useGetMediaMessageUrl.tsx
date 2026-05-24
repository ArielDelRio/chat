import { MediaType } from "@/package/types/MessageMedia";
import { Media } from "@twilio/conversations";
import { useEffect, useState } from "react";

export const useGetMediaMessageUrl = (
  media: Media
): {
  fileName: string;
  mediaUrl: string | null;
  isLoading: boolean;
  error: string | null;
  type: MediaType;
} => {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTemporaryMediaUrl = async () => {
      try {
        const url = await media.getContentTemporaryUrl();
        if (isMounted) {
          setMediaUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch media");
          setIsLoading(false);
        }
      }
    };

    fetchTemporaryMediaUrl();

    return () => {
      isMounted = false;
    };
  }, [media]);

  return {
    fileName: media.filename || "",
    mediaUrl,
    isLoading,
    error,
    type: (media.contentType.split("/")[0] as MediaType) || "unknown",
  };
};
