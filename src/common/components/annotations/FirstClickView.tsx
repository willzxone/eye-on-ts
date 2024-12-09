 
import ChangeVideo from '@/common/components/gallery/ChangeVideoModal';
import useMessagesSnackbar from '@/common/components/snackbar/useDemoMessagesSnackbar';
import { useEffect, useRef } from 'react';

export default function FirstClickView() {
  const isFirstClickMessageShown = useRef(false);
  const {enqueueMessage} = useMessagesSnackbar();

  useEffect(() => {
    if (!isFirstClickMessageShown.current) {
      isFirstClickMessageShown.current = true;
      enqueueMessage('firstClick');
    }
  }, [enqueueMessage]);

  return (
    <div className="w-full h-full flex flex-col p-8">
      <div className="grow flex flex-col gap-6">
        <h2 className="text-2xl">Click an object in the video to start</h2>
        <p className="!text-gray-60">
          Upload your video for masking and tracking.
        </p>
      </div>
      <div className="flex items-center">
        <ChangeVideo />
      </div>
    </div>
  );
}
