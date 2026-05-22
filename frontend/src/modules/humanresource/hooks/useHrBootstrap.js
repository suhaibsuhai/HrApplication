import { useEffect, useState } from "react";

import { loadHrBootstrap } from "../api/hrApi.js";
import { demoHrBootstrap } from "../data/demoHrData.js";

export function useHrBootstrap() {
  const [data, setData] = useState(demoHrBootstrap);
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState("demo");
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      try {
        const response = await loadHrBootstrap();
        if (!isMounted) return;
        setData(response);
        setSource("api");
        setError(null);
      } catch (requestError) {
        if (!isMounted) return;
        setData(demoHrBootstrap);
        setSource("demo");
        setError(requestError);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    setData,
    isLoading,
    source,
    error,
  };
}
