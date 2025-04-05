import ErrorBoundary from "../../common/components/error/ErrorBoundary";
import styles from "./YtLinkForm.module.css";
import GenericErrorCard from "../../common/components/error/GenericErrorCard";
import Resolutions from "../resolutions-response/Resolutions";
import { FormEvent, Suspense, useState } from "react";
import { fetchData } from "../../common/utils/suspenseFetch";
import { TYtInfoApiResponse } from "./videoInfo.api";

const YtFiltersForm = () => {
  const [resource, setResource] = useState<ReturnType<
    typeof fetchData<TYtInfoApiResponse>
  > | null>(null);

  const handleFiltersForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filtersData = {
      link: formData.get("ytLink")?.toString(),
    };
    const newResource = fetchData<TYtInfoApiResponse>(`getBackendUrl`, options);
    setResource(newResource);
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
      {filtersData === undefined && (
        <ErrorBoundary fallback={(err) => <GenericErrorCard error={err} />}>
          <Suspense fallback={<p>loading</p>}>
            <Resolutions />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
};

export default YtFiltersForm;
