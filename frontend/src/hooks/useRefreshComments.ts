import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { api } from "@/api";

const REFRESH_INTERVAL_MS = 5 * 1000;

export function useRefreshComments(itemId: number, currentCount: number) {
  const [diff, setDiff] = useState(0);
  const [isCurrent, setIsCurrent] = useState(true);
  const [debouncedIsCurrent, setDebouncedIsCurrent] = useState(true);

  const { data: count, status } = useQuery({
    queryKey: [itemId, currentCount],
    queryFn: () => api.checkCommentCount(itemId),
    refetchInterval: REFRESH_INTERVAL_MS,
  });

  useEffect(() => {
    setIsCurrent(true);
    if (status === "success" && count !== currentCount) {
      setIsCurrent(false);
      setDiff(count - currentCount);
    }
  }, [count, currentCount, status, setDiff, setIsCurrent]);

  useEffect(() => {
    if (!isCurrent) {
      const timeout = setTimeout(() => setDebouncedIsCurrent(isCurrent), 1000);
      return () => clearTimeout(timeout);
    }
    setDebouncedIsCurrent(isCurrent);
  }, [isCurrent]);

  return { isCurrent: debouncedIsCurrent, difference: diff < 1 ? undefined : diff };
}
