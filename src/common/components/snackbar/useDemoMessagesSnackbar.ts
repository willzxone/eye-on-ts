 
import {MessagesEventMap} from '@/common/components/snackbar/DemoMessagesSnackbarUtils';
import useMessagesSnackbar from '@/common/components/snackbar/useMessagesSnackbar';
import {messageMapAtom} from '@/demo/atoms';
import {useAtom} from 'jotai';
import {useCallback} from 'react';

type State = {
  enqueueMessage: (messageType: keyof MessagesEventMap) => void;
  clearMessage: () => void;
};

export default function useDemoMessagesSnackbar(): State {
  const [messageMap, setMessageMap] = useAtom(messageMapAtom);
  const {enqueueMessage: enqueue, clearMessage} = useMessagesSnackbar();

  const enqueueMessage = useCallback(
    (messageType: keyof MessagesEventMap) => {
      const {text, shown, options} = messageMap[messageType];
      if (!options?.repeat && shown === true) {
        return;
      }
      enqueue(text, options);
      const newState = {...messageMap};
      newState[messageType].shown = true;
      setMessageMap(newState);
    },
    [enqueue, messageMap, setMessageMap],
  );

  return {enqueueMessage, clearMessage};
}
