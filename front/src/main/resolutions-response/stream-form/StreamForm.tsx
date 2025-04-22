import Button from "../../../common/components/button/Button";
import streamStyle from "./StreamForm.module.css";

type StreamFormProps = {
  video?: unknown;
  audio?: unknown;
  both?: unknown;
};

const StreamForm = ({ audio, video, both }: StreamFormProps) => {
  const isDisabled = !(video || audio || both);
  const isOnlyAudio = !video && audio ? true : false;
  const isOnlyVideo = video && !audio ? true : false;
  const isBoth = (video && audio) || both ? true : false;
  return (
    <div className={streamStyle.submitContainer}>
      <Button className={streamStyle.button} disabled={isDisabled}>
        Fetch Stream
      </Button>
      {isDisabled && <span>Please, select appropriate format.</span>}
      {isOnlyAudio && (
        <span>
          Audio selected only, select video as well or download audio only.
        </span>
      )}
      {isOnlyVideo && (
        <span>
          Video selected only, select audio as well or download video only.
        </span>
      )}
      {isBoth && (
        <span>Fetch stream and downlaod video with selected format.</span>
      )}
    </div>
  );
};

export default StreamForm;
