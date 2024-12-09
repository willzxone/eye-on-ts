 
import {loader} from '@monaco-editor/react';

import Logger from '@/common/logger/Logger';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({monaco});

loader.init().then(monaco => {
  Logger.debug('initialized monaco', monaco);
});
