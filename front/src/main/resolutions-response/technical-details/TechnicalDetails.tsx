import techDetailsStyles from "./TechnicalDetails.module.css";

type TTechnicalDetails = {
  name: string;
  description: string;
};

const technicalDetails: TTechnicalDetails[] = [
  { name: "Itag", description: "Unique identifier for the stream format." },
  {
    name: "Quality",
    description: "The resolution or audio quality of the stream.",
  },
  {
    name: "Codec",
    description:
      "he format used to compress and encode the video or audio stream.",
  },
  {
    name: "Container",
    description: "The file format that holds both video and audio (mp4, webm).",
  },
  {
    name: "FPS",
    description: "Number of frames displayed per second in the video",
  },
  {
    name: "Language",
    description: "Audio track language",
  },
];

const TechnicalDetails = () => {
  return (
    <div className={techDetailsStyles.infoPanel}>
      <h3>Technical Details:</h3>
      <ul>
        {technicalDetails.map((detail) => (
          <li key={detail.name}>
            <strong>{detail.name}:</strong> {detail.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechnicalDetails;
