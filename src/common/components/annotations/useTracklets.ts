 
import {trackletObjectsAtom} from '@/demo/atoms';
import {useAtomValue} from 'jotai';

export default function useTracklets() {
  return useAtomValue(trackletObjectsAtom);
}
