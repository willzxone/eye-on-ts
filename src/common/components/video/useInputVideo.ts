 
import {inputVideoAtom} from '@/demo/atoms';
import {useAtom} from 'jotai';

export default function useInputVideo() {
  const [inputVideo, setInputVideo] = useAtom(inputVideoAtom);
  return {inputVideo, setInputVideo};
}
