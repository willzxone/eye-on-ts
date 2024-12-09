 
import PrimaryCTAButton from '@/common/components/button/PrimaryCTAButton';
import useVideo from '@/common/components/video/editor/useVideo';
import {ChevronRight} from '@carbon/icons-react';

type Props = {
  onSessionClose: () => void;
};

export default function CloseSessionButton({onSessionClose}: Props) {
  const video = useVideo();

  function handleCloseSession() {
    video?.closeSession();
    video?.logAnnotations();
    onSessionClose();
  }

  return (
    <PrimaryCTAButton onClick={handleCloseSession} endIcon={<ChevronRight />}>
      Good to go
    </PrimaryCTAButton>
  );
}
