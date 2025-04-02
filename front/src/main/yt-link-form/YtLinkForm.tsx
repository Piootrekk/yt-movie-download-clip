import styles from "./YtLinkForm.module.css";

const YtLinkForm = () => {
  return (
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
  );
};

export default YtLinkForm;
