import { Suspense, useState } from "react";
import styles from "./MainContent.module.css";
import YtFiltersForm from "./yt-link-form/YtFiltersForm";
import ErrorBoundary from "../common/components/error/ErrorBoundary";
import GenericErrorCard from "../common/components/error/GenericErrorCard";
import ResolutionsMain from "./resolutions-response/ResolutionsMain";
import ResolutionLoading from "./resolutions-response/resolution-loading/ResolutionLoading";

const MainContent = () => {
  const [formValues, setFormValues] = useState<unknown | null>(null);

  const handleFormValues = (newValue: unknown) => {
    setFormValues(newValue);
  };

  const resolutionsKey = formValues ? JSON.stringify(formValues) : "initial";
  return (
    <>
      <main className={styles.container}>
        <h1 className={styles.title}>Fetch info about youtube video</h1>
        <YtFiltersForm handleFormValues={handleFormValues} />
        {formValues !== null && (
          <ErrorBoundary fallback={(err) => <GenericErrorCard error={err} />}>
            <Suspense fallback={<ResolutionLoading />}>
              <ResolutionsMain formValues={formValues} key={resolutionsKey} />
            </Suspense>
          </ErrorBoundary>
        )}
      </main>
    </>
  );
};

export default MainContent;
