import { useState, useCallback } from "react";

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  const sendRequest = useCallback(
    async (params) => {
      setIsLoading(true);
      setIsError(null);
      try {
        const response = await fetch(params.url, {
          method: params.method ? params.method : "GET",
          headers: params.headers ? params.header : {},
          body: params.body ? JSON.stringify(params.body) : null,
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        applyData(data);
      } catch (err) {
        setIsError(err.message);
      }
    },
    [applyData]
  );
  return {
    isLoading,
    isError,
    sendRequest,
  };
};
export default useHttp;
