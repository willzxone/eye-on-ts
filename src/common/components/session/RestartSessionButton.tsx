 
import useRestartSession from '@/common/components/session/useRestartSession';
import {Reset} from '@carbon/icons-react';
import {Button, Loading} from 'react-daisyui';

type Props = {
  onRestartSession: () => void;
};

export default function RestartSessionButton({onRestartSession}: Props) {
  const {restartSession, isLoading} = useRestartSession();

  function handleRestartSession() {
    restartSession(onRestartSession);
  }

  return (
    <Button
      color="ghost"
      onClick={handleRestartSession}
      className="!px-4 !rounded-full font-medium text-white hover:bg-black"
      startIcon={isLoading ? <Loading size="sm" /> : <Reset size={20} />}>
      Start over
    </Button>
  );
}
