import Card from "../../../common/components/panel-card/Card";

type SelectedDetailsProps = {
  itag?: number;
  width?: number;
  height?: number;
  fps?: number;
  language?: string;
  approxDurationMs?: string;
  container?: string;
};

const SelectedDetails = ({
  itag,
  width,
  height,
  fps,
  language,
  approxDurationMs,
  container,
}: SelectedDetailsProps) => {
  return (
    <Card>
      <p>Itag: {itag ? itag : "NOT SPECIFIED"}</p>
      <p>Itag: {width & height ? `${width}X${height}` : "NOT SPECIFIED"}</p>
      <p>Itag: {fps ? fps : "NOT SPECIFIED"}</p>
      <p>Itag: {approxDurationMs ? approxDurationMs : "NOT SPECIFIED"}</p>
      <p>Itag: {container ? container : "NOT SPECIFIED"}</p>
      <p>Itag: {language ? language : "NOT SPECIFIED"}</p>
    </Card>
  );
};

export default SelectedDetails;
