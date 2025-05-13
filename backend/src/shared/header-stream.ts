type THeadersStream = { type?: string; disposition: string };
type THeaderArgs = {
  fileName?: string;
  container?: string;
  type?: string;
};

const handleStreamHeader = ({
  fileName,
  container,
  type,
}: THeaderArgs): THeadersStream => {
  const sanitizedType = type || 'video';
  const sanitizedName = fileName || `${sanitizedType}-${Date.now()}`;
  return {
    type: container ? `${sanitizedType}/${container}` : undefined,
    disposition: `attachment; filename="${sanitizedName}"`,
  };
};

export type { THeadersStream };
export { handleStreamHeader };
