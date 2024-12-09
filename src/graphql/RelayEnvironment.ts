 
import Logger from '@/common/logger/Logger';
import {
  CacheConfig,
  Environment,
  FetchFunction,
  GraphQLResponse,
  LogEvent,
  Network,
  ObservableFromValue,
  RecordSource,
  RequestParameters,
  Store,
  UploadableMap,
  Variables,
} from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

function createFetchRelay(endpoint: string): FetchFunction {
  return (
    request: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap | null,
  ): ObservableFromValue<GraphQLResponse> => {
    Logger.debug(
      `fetching query ${request.name} with ${JSON.stringify(variables)}`,
    );
    return fetchGraphQL(endpoint, request, variables, cacheConfig, uploadables);
  };
}

export function createEnvironment(endpoint: string): Environment {
  return new Environment({
    log: (logEvent: LogEvent) => Logger.debug(logEvent.name, logEvent),
    network: Network.create(createFetchRelay(endpoint)),
    store: new Store(new RecordSource()),
  });
}
