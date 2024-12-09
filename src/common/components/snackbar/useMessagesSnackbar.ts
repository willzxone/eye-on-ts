 
import {useSetAtom} from 'jotai';
import {useCallback} from 'react';
import {
  MessageType,
  messageAtom,
} from '@/common/components/snackbar/snackbarAtoms';

export type EnqueueOption = {
  duration?: number;
  type?: MessageType;
  expire?: boolean;
  showClose?: boolean;
  showReset?: boolean;
};

type State = {
  clearMessage: () => void;
  enqueueMessage: (message: string, options?: EnqueueOption) => void;
};

export default function useMessagesSnackbar(): State {
  const setMessage = useSetAtom(messageAtom);

  const enqueueMessage = useCallback(
    (message: string, options?: EnqueueOption) => {
      setMessage({
        text: message,
        type: options?.type ?? 'info',
        duration: options?.duration ?? 5000,
        progress: 0,
        startTime: Date.now(),
        expire: options?.expire ?? true,
        showClose: options?.showClose ?? true,
        showReset: options?.showReset ?? false,
      });
    },
    [setMessage],
  );

  function clearMessage() {
    setMessage(null);
  }

  return {enqueueMessage, clearMessage};
}
