 
import useRestartSession from '@/common/components/session/useRestartSession';
import useMessagesSnackbar from '@/common/components/snackbar/useDemoMessagesSnackbar';
import useVideo from '@/common/components/video/editor/useVideo';
import {isPlayingAtom, isStreamingAtom, labelTypeAtom} from '@/demo/atoms';
import {Reset} from '@carbon/icons-react';
import stylex from '@stylexjs/stylex';
import {useAtomValue, useSetAtom} from 'jotai';
import {useState} from 'react';
import {Button, Loading} from 'react-daisyui';

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});

type Props = {
  onRestart: () => void;
};

export default function ClearAllPointsInVideoButton({onRestart}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isPlaying = useAtomValue(isPlayingAtom);
  const isStreaming = useAtomValue(isStreamingAtom);
  const setLabelType = useSetAtom(labelTypeAtom);
  const {clearMessage} = useMessagesSnackbar();
  const {restartSession} = useRestartSession();

  const video = useVideo();

  async function handleRestart() {
    if (video === null) {
      return;
    }

    setIsLoading(true);
    if (isPlaying) {
      video.pause();
    }
    if (isStreaming) {
      await video.abortStreamMasks();
    }
    const isSuccessful = await video.clearPointsInVideo();
    if (!isSuccessful) {
      await restartSession();
    }
    video.frame = 0;
    setLabelType('positive');
    onRestart();
    clearMessage();
    setIsLoading(false);
  }

  return (
    <div {...stylex.props(styles.container)}>
      <Button
        color="ghost"
        onClick={handleRestart}
        className="!px-4 !rounded-full font-medium text-white hover:bg-black"
        startIcon={isLoading ? <Loading size="sm" /> : <Reset size={20} />}>
        Start over
      </Button>
    </div>
  );
}
