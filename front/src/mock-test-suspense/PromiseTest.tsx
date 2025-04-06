import { use } from "react";
import { fetchDataAsync, getCachedPromise } from "../common/utils/fetchCache";

const promiseExternalApi = (postId: number) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  return getCachedPromise(url, () => fetchDataAsync<unknown>(url));
};

type PromiseTestPros = {
  postId: number;
};

const PromiseTest = ({ postId }: PromiseTestPros) => {
  const response = use(promiseExternalApi(postId));

  return (
    <>
      <p>TEST - Post ID: {postId}</p>
      <p>{JSON.stringify(response, null, 2)}</p>
    </>
  );
};

export default PromiseTest;
