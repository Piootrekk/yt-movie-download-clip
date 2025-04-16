import Card from "../../../common/components/panel-card/Card";

type SelectedDetailsProps = {
  width?: number;
  height?: number;
  fps?: number;
  language?: string;
  approxDurationMs?: string;
  container?: string;
};

const SelectedDetails = ({
  width,
  height,
  fps,
  language,
  approxDurationMs,
  container,
}: SelectedDetailsProps) => {
  return (
    <Card>
      <p>
        Resolution: {width && height ? `${width}X${height}` : "NOT SPECIFIED"}
      </p>
      <p>Fps: {fps ? fps : "NOT SPECIFIED"}</p>
      <p>Duration: {approxDurationMs ? approxDurationMs : "NOT SPECIFIED"}</p>
      <p>Container: {container ? container : "NOT SPECIFIED"}</p>
      <p>Language: {language ? language : "NOT SPECIFIED"}</p>
    </Card>
  );
};

export default SelectedDetails;
