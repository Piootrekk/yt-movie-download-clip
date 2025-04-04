import styles from "./GenericErrorCard.module.css";

type GenericErrorCardProps = {
  error?: Error;
};

const GenericErrorCard = ({ error }: GenericErrorCardProps) => {
  return (
    <p className={styles.error}>{error ? error.message : "Unknown error"}</p>
  );
};

export default GenericErrorCard;
