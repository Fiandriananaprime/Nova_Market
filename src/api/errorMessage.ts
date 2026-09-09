import { isAxiosError } from 'axios';

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.error?.message;
    if (typeof message === 'string' && message.trim()) return message;
  }

  return fallback;
};
