const formatTime = (ms: string | number): string => {
  const numericMs = Number(ms);
  const totalSeconds = Math.floor(numericMs / 1000);
  const milliseconds = numericMs % 1000;
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

const formatBitrate = (bitrate: string | number): string => {
  const numericBitrate = Number(bitrate);
  const mbps = 1_000_000;
  const kbps = 1_000;
  if (numericBitrate >= mbps) {
    return `${(numericBitrate / mbps).toFixed(2)} Mbps`;
  } else if (numericBitrate >= kbps) {
    return `${(numericBitrate / kbps).toFixed(2)} Kbps`;
  } else {
    return `${numericBitrate} Bps`;
  }
};

const formatSize = (
  ...fileSize: Array<string | number | undefined>
): string => {
  const gbUnit = 1024 ** 3;
  const mbUnit = 1024 ** 2;
  const kbUnit = 1024;

  const totalBytes = fileSize.reduce((accumulator: number, currentValue) => {
    return accumulator + parseInt(currentValue?.toString() || "0", 10);
  }, 0);

  if (totalBytes >= gbUnit) {
    return `${(totalBytes / gbUnit).toFixed(2)} GB`;
  } else if (totalBytes >= mbUnit) {
    return `${(totalBytes / mbUnit).toFixed(2)} MB`;
  } else if (totalBytes >= kbUnit) {
    return `${(totalBytes / kbUnit).toFixed(2)} KB`;
  } else {
    return `${totalBytes} B`;
  }
};

export { formatTime, formatBitrate, formatSize };
