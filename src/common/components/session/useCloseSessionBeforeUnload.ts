 
import {useCloseSessionBeforeUnloadMutation$variables} from '@/common/components/session/__generated__/useCloseSessionBeforeUnloadMutation.graphql';
import {sessionAtom} from '@/demo/atoms';
import useSettingsContext from '@/settings/useSettingsContext';
import {useAtomValue} from 'jotai';
import {useEffect, useMemo} from 'react';
import {ConcreteRequest, graphql} from 'relay-runtime';

/**
 * The useCloseSessionBeforeUnload is a dirty workaround to send close session
 * requests on window/tab close. Going through Relay does not send the request
 * even if the `keepalive` flag is set for the request. It does work when the
 * fetch is called directly with the close session mutation.
 *
 * Caveat: there is static typing, but there might be other caveats around this
 * quirky hack.
 */
export default function useCloseSessionBeforeUnload() {
  const session = useAtomValue(sessionAtom);
  const {settings} = useSettingsContext();

  const data = useMemo(() => {
    if (session == null) {
      return null;
    }

    const graphQLTaggedNode = graphql`
      mutation useCloseSessionBeforeUnloadMutation($input: CloseSessionInput!) {
        closeSession(input: $input) {
          success
        }
      }
    ` as ConcreteRequest;

    const variables: useCloseSessionBeforeUnloadMutation$variables = {
      input: {
        sessionId: session.id,
      },
    };

    const query = graphQLTaggedNode.params.text;
    if (query === null) {
      return null;
    }

    return {
      query,
      variables,
    };
  }, [session]);

  useEffect(() => {
    function onBeforeUpload() {
      if (data == null) {
        return;
      }

      fetch(`${settings.inferenceAPIEndpoint}/graphql`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        keepalive: true,
        body: JSON.stringify(data),
      });
    }
    window.addEventListener('beforeunload', onBeforeUpload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUpload);
    };
  }, [data, session, settings.inferenceAPIEndpoint]);
}
