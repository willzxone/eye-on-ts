 
import {useAtom} from 'jotai';
import {useEffect, useRef} from 'react';
import {Message, messageAtom} from '@/common/components/snackbar/snackbarAtoms';

export default function useExpireMessage() {
  const [message, setMessage] = useAtom(messageAtom);
  const messageRef = useRef<Message | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  useEffect(() => {
    function resetInterval() {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    if (intervalRef.current == null && message != null && message.expire) {
      intervalRef.current = setInterval(() => {
        const prevMessage = messageRef.current;
        if (prevMessage == null) {
          setMessage(null);
          resetInterval();
          return;
        }
        const messageDuration = Date.now() - prevMessage.startTime;
        if (messageDuration > prevMessage.duration) {
          setMessage(null);
          resetInterval();
          return;
        }
        setMessage({
          ...prevMessage,
          progress: messageDuration / prevMessage.duration,
        });
      }, 20);
    }
  }, [message, setMessage]);

  useEffect(() => {
    return () => {
      if (intervalRef.current != null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
