 
import {useCallback, useEffect, useRef} from 'react';

function preventDefault(event: TouchEvent) {
  event.preventDefault();
}

export default function useDisableScrolling() {
  const isDisabledRef = useRef<boolean>(false);

  const disable = useCallback(() => {
    // Scrolling is already disabled
    if (isDisabledRef.current) {
      return;
    }
    isDisabledRef.current = true;
    document.body.addEventListener('touchmove', preventDefault, {
      passive: false,
    });
  }, []);

  const enable = useCallback(() => {
    // Scrolling is not disabled
    if (!isDisabledRef.current) {
      return;
    }
    isDisabledRef.current = false;
    document.body.removeEventListener('touchmove', preventDefault);
  }, []);

  useEffect(() => {
    // Enable scrolling again on unmount
    return () => {
      enable();
    };
  }, [enable]);

  return {
    disable,
    enable,
  };
}
