 
import ToolbarHeaderWrapper from '@/common/components/toolbar/ToolbarHeaderWrapper';
import { isStreamingAtom } from '@/demo/atoms';
import { useAtomValue } from 'jotai';

export default function ObjectsToolbarHeader() {
  const isStreaming = useAtomValue(isStreamingAtom);
  // const streamingState = useAtomValue(streamingStateAtom);

  return (
    <ToolbarHeaderWrapper
    title={isStreaming === true ? 'Tracking objects' : 'Select objects'}
    description={
      isStreaming
        ? 'Watch the video closely for any places where your objects aren’t tracked correctly. You can also stop tracking to make additional edits.'
        : 'Adjust the selection of your object, or add additional objects. Press “Track objects” to track your objects throughout the video.'
    }
      className="mb-8"
    />
  );
}
