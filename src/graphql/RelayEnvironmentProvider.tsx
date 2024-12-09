 
import ErrorFallback from '@/common/error/ErrorFallback';
import LoadingMessage from '@/common/loading/LoadingMessage';
import {createEnvironment} from '@/graphql/RelayEnvironment';
import {
  ComponentType,
  PropsWithChildren,
  ReactNode,
  Suspense,
  useMemo,
  useState,
} from 'react';
import {ErrorBoundary, FallbackProps} from 'react-error-boundary';
import {RelayEnvironmentProvider} from 'react-relay';

type Props = PropsWithChildren<{
  suspenseFallback?: ReactNode;
  errorFallback?: ComponentType<FallbackProps>;
  endpoint: string;
}>;

export default function OnevisionRelayEnvironmentProvider({
  suspenseFallback,
  errorFallback = ErrorFallback,
  endpoint,
  children,
}: Props) {
  const [retryKey, setRetryKey] = useState<number>(0);

  const environment = useMemo(() => {
    return createEnvironment(endpoint);
    // The retryKey is needed to force a new Relay Environment
    // instance when the user retries after an error occurred.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, retryKey]);

  // Force re-creating Relay Environment
  function handleReset() {
    setRetryKey(k => k + 1);
  }

  return (
    <ErrorBoundary onReset={handleReset} FallbackComponent={errorFallback}>
      <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback={suspenseFallback ?? <LoadingMessage />}>
          {children}
        </Suspense>
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  );
}
