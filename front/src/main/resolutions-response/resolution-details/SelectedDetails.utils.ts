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

const formatBitrate = (
  ...bitrates: Array<string | number | undefined>
): string => {
  const totalBitrates = bitrates.reduce((accumulator: number, currentValue) => {
    return accumulator + parseInt(currentValue?.toString() || "0", 10);
  }, 0);

  const mbps = 1_000_000;
  const kbps = 1_000;

  if (totalBitrates >= mbps) {
    return `${(totalBitrates / mbps).toFixed(2)} Mbps`;
  } else if (totalBitrates >= kbps) {
    return `${(totalBitrates / kbps).toFixed(2)} Kbps`;
  } else {
    return `${totalBitrates} Bps`;
  }
};

const formatSize = (
  ...fileSize: Array<string | number | undefined>
): string => {
  const kbUnit = 1024;
  const mbUnit = kbUnit ** 2;
  const gbUnit = kbUnit ** 3;

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
