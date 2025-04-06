import ErrorBoundary from "../../common/components/error/ErrorBoundary";
import styles from "./YtLinkForm.module.css";
import GenericErrorCard from "../../common/components/error/GenericErrorCard";
import Resolutions from "../resolutions-response/Resolutions";
import { FormEvent, Suspense, useState } from "react";
import { TFormDataFormats } from "../Formats.type";

const YtFiltersForm = () => {
  const [formats, setFormats] = useState<TFormDataFormats | null>(null);

  const handleFiltersForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filtersData = {
      url: formData.get("ytLink")?.toString(),
    };
    setFormats(filtersData);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleFiltersForm}>
        <input
          type="text"
          placeholder="Paste YouTube URL here..."
          className={styles.input}
          name="ytLink"
        />
        <button type="submit" className={styles.button}>
          {"Fetch"}
        </button>
      </form>
      {formats !== null && (
        <ErrorBoundary fallback={(err) => <GenericErrorCard error={err} />}>
          <Suspense fallback={<p>loading</p>}>
            <Resolutions formFormats={formats} key={formats.url} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};

export default YtFiltersForm;
