 
import errorReportAtom from '@/common/error/errorReportAtom';
import {useSetAtom} from 'jotai';
import {useCallback} from 'react';

export default function useReportError() {
  const setError = useSetAtom(errorReportAtom);
  return useCallback(
    (error: unknown) => {
      if (typeof error === 'string') {
        setError(new Error(error));
      } else if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('unknown error occurred'));
      }
    },
    [setError],
  );
}
