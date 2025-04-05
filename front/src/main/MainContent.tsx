import styles from "./MainContent.module.css";
import YtFiltersForm from "./yt-link-form/YtFiltersForm";

const MainContent = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Fetch info about youtube video</h1>
      <YtFiltersForm />
    </main>
  );
};

export default MainContent;
