 
import {atom} from 'jotai';

export type MessageType = 'info' | 'loading' | 'warning';

export type Message = {
  type: MessageType;
  text: string;
  duration: number;
  progress: number;
  startTime: number;
  expire: boolean;
  showClose: boolean;
  showReset: boolean;
};

export const messageAtom = atom<Message | null>(null);
