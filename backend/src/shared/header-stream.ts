type THeadersStream = { type: string; disposition: string };

const handleStreamHeader = (
  fileName?: string,
  container?: string,
  type?: string,
): THeadersStream => {
  const sanitizedContaier = container || 'mp4';
  const sanitizedType = type || 'video';
  const sanitizedName =
    fileName || `${sanitizedType}-${Date.now()}.${sanitizedContaier}`;
  return {
    type: `${sanitizedType}/${sanitizedContaier}`,
    disposition: `attachment; filename="${sanitizedName}"`,
  };
};

export type { THeadersStream };
export { handleStreamHeader };
