import ErrorBoundary from "../../common/components/error/ErrorBoundary";
import styles from "./YtLinkForm.module.css";
import GenericErrorCard from "../../common/components/error/GenericErrorCard";
import Resolutions from "../resolutions-response/Resolutions";

const YtLinkForm = () => {
  return (
    <>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Paste YouTube URL here..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {"Fetch"}
        </button>
      </form>
      <ErrorBoundary fallback={(err) => <GenericErrorCard error={err} />}>
        <Resolutions />
      </ErrorBoundary>
    </>
  );
};

export default YtLinkForm;
