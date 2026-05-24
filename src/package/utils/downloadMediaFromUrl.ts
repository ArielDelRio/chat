/**
 * Downloads media from a given URL and triggers a download in the browser.
 *
 * @param {string} url - The URL of the media to download.
 * @param {string | null} [fileName] - The desired file name for the download. Defaults to a timestamped name.
 */
export const downloadMediaFromUrl = async (
  url: string,
  fileName?: string | null
) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download media: ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(new Blob([blob]));
    const defaultFileName = url.split("/").pop() || `chat-media-${Date.now()}`;
    const a = document.createElement("a");

    a.href = blobUrl;
    a.setAttribute("download", fileName || defaultFileName);
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to download media: ${error.message}`);
    }
    throw new Error("An unknown error occurred during media download");
  }
};
