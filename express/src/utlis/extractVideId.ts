const extractVideoId = (link: string): string => {
  const url = new URL(link);
  const searchParams = new URLSearchParams(url.search);
  const videoId = searchParams.get("v");
  if (!videoId) throw new Error("Invalid YouTube link");
  console.log(videoId);
  return videoId;
};
