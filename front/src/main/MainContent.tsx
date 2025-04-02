import styles from "./MainContent.module.css";
import YtLinkForm from "./yt-link-form/YtLinkForm";

const MainContent = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Fetch info about youtube video</h1>
      <YtLinkForm />
    </main>
  );
};

export default MainContent;
