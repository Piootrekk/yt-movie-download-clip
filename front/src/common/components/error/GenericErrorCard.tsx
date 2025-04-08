import ErrorIcon from "../../icon/ErrorIcon";
import errorStyles from "./GenericErrorCard.module.css";

type GenericErrorCardProps = {
  error?: Error;
};

const GenericErrorCard = ({ error }: GenericErrorCardProps) => {
  return (
    <div className={errorStyles.error}>
      <ErrorIcon size={36} className={errorStyles.icon} />
      <p className={errorStyles.error}>
        {error ? error.message : "Unknown error"}
      </p>
      <ErrorIcon size={36} className={errorStyles.icon} />
    </div>
  );
};

export default GenericErrorCard;
