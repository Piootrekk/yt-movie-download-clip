import { TResponseYt } from "../sechemas/yt-schema";

const extractVideoId = (link: string): string => {
  const url = new URL(link);
  if (link.includes("youtu.be") || link.includes("youtube.com/shorts/")) {
    const videoId = url.pathname.split("/").pop();
    if (!videoId) throw new Error("Invalid YouTube link");
    return videoId;
  }
  const searchParams = new URLSearchParams(url.search);
  const videoId = searchParams.get("v");
  if (!videoId) throw new Error("Invalid YouTube link");
  return videoId;
};

const extractVideoStreams = async (pageContent: string) => {
  const playerResponseMatch = pageContent.match(
    /ytInitialPlayerResponse\s*=\s*(\{.+?\});/
  );
  if (!playerResponseMatch) {
    throw new Error("Cannot extract video info");
  }
  const playerResponse = JSON.parse(playerResponseMatch[1]);
  console.log(playerResponse);
  const streamingData = playerResponse.streamingData as TResponseYt;

  if (!streamingData) {
    throw new Error("No streaming data available");
  }

  const audioStreams = streamingData.adaptiveFormats.filter((f) =>
    f.mimeType.startsWith("audio/")
  );

  const videoStreams = streamingData.formats.filter((f) =>
    f.mimeType.startsWith("video/")
  );

  return { audioStreams, videoStreams };
};

const decodeVideoUrl = (signatureCipher: string) => {
  const [cipher, signature] = signatureCipher.split("&");
  const url = new URLSearchParams(cipher).get("url");
  return `${url}&sig=${signature}`;
};

export { extractVideoId, extractVideoStreams, decodeVideoUrl };
