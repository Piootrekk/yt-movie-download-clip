import { Suspense } from "react";
import ErrorBoundary from "../common/components/error/ErrorBoundary";
import GenericErrorCard from "../common/components/error/GenericErrorCard";
import PromiseTest from "./PromiseTest";

const App = () => {
  return (
    <ErrorBoundary fallback={(err) => <GenericErrorCard error={err} />}>
      <Suspense fallback={<p>LOADING....</p>}>
        <PromiseTest postId={2} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
