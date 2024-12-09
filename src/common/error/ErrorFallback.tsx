 
import useReportError from '@/common/error/useReportError';
import {Button} from 'react-daisyui';
import {FallbackProps} from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const reportError = useReportError();

  function handleReportError() {
    reportError(error);
  }

  return (
    <div className="h-full flex flex-col gap-2 items-center justify-center">
      <p>Please check your connection and retry or report error.</p>
      <div className="flex flex-row gap-2">
        <Button color="ghost" onClick={resetErrorBoundary}>
          Retry
        </Button>
        <Button
          className="text-error"
          color="ghost"
          onClick={handleReportError}>
          Report Error
        </Button>
      </div>
    </div>
  );
}
