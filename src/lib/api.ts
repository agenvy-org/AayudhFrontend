/**
 * Simulated API client for AAYUDH News.
 * Wraps mock data requests in Promises with configurable latency (default 500ms)
 * to demonstrate skeleton loading and maintain a CMS-ready asynchronous structure.
 */

export const apiDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetcher = async <T>(data: T, delayMs: number = 500): Promise<T> => {
  await apiDelay(delayMs);
  return data;
};
