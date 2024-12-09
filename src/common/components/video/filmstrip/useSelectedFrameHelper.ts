 
import {useAtomValue} from 'jotai';
import {selectedFrameHelperAtom} from './atoms';

export default function useSelectedFrameHelper() {
  return useAtomValue(selectedFrameHelperAtom);
}
