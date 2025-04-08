import ErrorBoundary from "../../common/components/error/ErrorBoundary";
import styles from "./YtLinkForm.module.css";
import GenericErrorCard from "../../common/components/error/GenericErrorCard";
import Resolutions from "../resolutions-response/Resolutions";
import { FormEvent, Suspense, useState } from "react";

const YtFiltersForm = () => {
  const [formValues, setFormValues] = useState<unknown | null>(null);

  const handleFiltersForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filtersData = {
      url: formData.get("ytLink")?.toString(),
      clients: formData.getAll("clients").map((client) => client.toString()),
    };
    setFormValues(filtersData);
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
      {formValues !== null && (
        <ErrorBoundary fallback={(err) => <GenericErrorCard error={err} />}>
          <Suspense fallback={<p>loading</p>}>
            <Resolutions formValues={formValues} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};

export default YtFiltersForm;
