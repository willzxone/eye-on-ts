 
import {getErrorTitle} from '@/common/error/ErrorUtils';
import errorReportAtom from '@/common/error/errorReportAtom';
import emptyFunction from '@/common/utils/emptyFunction';
import {BugAntIcon} from '@heroicons/react/24/outline';
import {Editor} from '@monaco-editor/react';
import {useAtom} from 'jotai';
import {useEffect, useRef} from 'react';
import {Button, Modal} from 'react-daisyui';

type Props = {
  onReport?: (error: Error) => void;
};

export default function ErrorReport({onReport = emptyFunction}: Props) {
  const [error, setError] = useAtom(errorReportAtom);
  const errorModalRef = useRef<HTMLDialogElement>(null);

  // Clean error state on ESC
  useEffect(() => {
    function onCloseDialog() {
      setError(null);
    }
    const errorModal = errorModalRef.current;
    errorModal?.addEventListener('close', onCloseDialog);
    return () => {
      errorModal?.removeEventListener('close', onCloseDialog);
    };
  }, [setError]);

  useEffect(() => {
    if (error != null) {
      errorModalRef.current?.showModal();
    } else {
      errorModalRef.current?.close();
    }
  }, [error, setError]);

  function handleCloseModal() {
    errorModalRef.current?.close();
  }

  function handleReport() {
    if (error != null) {
      onReport(error);
    }
  }

  return (
    <Modal ref={errorModalRef} className="max-w-[800px]">
      <Modal.Header>
        {error != null ? getErrorTitle(error) : 'Unknown error'}
      </Modal.Header>
      <Modal.Body>
        <Editor
          className="h-[400px]"
          language="javascript"
          value={error?.stack ?? ''}
          options={{
            wordWrap: 'wordWrapColumn',
            scrollBeyondLastLine: false,
            readOnly: true,
            minimap: {
              enabled: false,
            },
          }}
        />
      </Modal.Body>
      <Modal.Actions>
        <Button
          color="error"
          startIcon={<BugAntIcon className="w-4 h-4" />}
          onClick={handleReport}>
          Report
        </Button>
        <Button onClick={handleCloseModal}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}
