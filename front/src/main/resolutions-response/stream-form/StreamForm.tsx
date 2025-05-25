import Button from "../../../common/components/button/Button";
import FetchIcon from "../../../common/icon/FetchIcon";
import streamStyle from "./StreamForm.module.css";

type StreamFormProps = {
  video?: unknown;
  audio?: unknown;
  both?: unknown;
};

type TVariants = {
  isSelected: boolean;
  content: string;
  className?: string;
};

const NoteDisplayer = ({ notes }: { notes: TVariants[] }) => {
  const note = notes.find((note) => note.isSelected);
  if (note === undefined)
    throw new Error("Smth wrong with note format selection");
  return <span className={note.className}>{note.content}</span>;
};

const StreamForm = ({ audio, video, both }: StreamFormProps) => {
  const isDisabled = !(video || audio || both);
  const isOnlyAudio = !video && audio ? true : false;
  const isOnlyVideo = video && !audio ? true : false;
  const isBoth = (video && audio) || both ? true : false;

  const notes = [
    {
      isSelected: isBoth,
      content: "Fetch stream and downlaod video with selected format.",
      className: streamStyle.enableCorrect,
    },
    {
      isSelected: isDisabled,
      content: "Please, select appropriate format.",
      className: streamStyle.disable,
    },
    {
      isSelected: isOnlyAudio,
      content:
        "Audio selected only, select video as well or download audio only.",
      className: streamStyle.enableWarning,
    },
    {
      isSelected: isOnlyVideo,
      content:
        "Video selected only, select audio as well or download video only.",
      className: streamStyle.enableWarning,
    },
  ] satisfies TVariants[];

  return (
    <div className={streamStyle.submitContainer}>
      <NoteDisplayer notes={notes} />
      <Button className={streamStyle.button} disabled={isDisabled}>
        <FetchIcon size={24} />
        <span>Fetch Stream</span>
      </Button>
    </div>
  );
};

export default StreamForm;
