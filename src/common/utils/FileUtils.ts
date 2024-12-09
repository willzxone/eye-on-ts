 
import Logger from '@/common/logger/Logger';

type Range = {
  start: number;
  end: number;
};

type FileStreamPart = {
  data: Uint8Array;
  range: Range;
  contentLength: number;
};

export type FileStream = AsyncGenerator<FileStreamPart, File | null, null>;

/**
 * Asynchronously generates a SHA-256 hash for a Blob object.
 *
 * DO NOT USE this function casually. Computing the SHA-256 is expensive and can
 * take several 100 milliseconds to complete.
 *
 * @param blob - The Blob object to be hashed.
 * @returns A Promise that resolves to a string representing the SHA-256 hash of
 * the Blob.
 */
export async function hashBlob(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  // Crypto subtle is only availabe in secure contexts. For example, this will
  // be the case when running the project locally with http protocol.
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle
  if (crypto.subtle != null) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // If not secure context, return random string
  return (Math.random() + 1).toString(36).substring(7);
}

export async function* streamFile(url: string, init?: RequestInit): FileStream {
  try {
    const response = await fetch(url, init);

    let blob: Blob;

    // Try to download the file with a stream reader. This has the benefit
    // of providing progress during the download. It requires the body and
    // Content-Length. As a fallback, it uses the blob function on the
    // response object.
    const contentLength = response.headers.get('Content-Length');
    if (response.body != null && contentLength != null) {
      const totalLength = parseInt(contentLength);
      const chunks: Uint8Array[] = [];
      let start = 0;
      let end = 0;

      const reader = response.body.getReader();
      try {
        while (true) {
          const {done, value} = await reader.read();
          if (done) {
            break;
          }

          start = end;
          end += value.length;

          yield {
            data: value,
            range: {start, end},
            contentLength: totalLength,
          };
        }
      } finally {
        reader.releaseLock();
      }
      blob = new Blob(chunks);
    } else {
      blob = await response.blob();
    }

    const filename = await hashBlob(blob);
    return new File([blob], `${filename}.mp4`);
  } catch (error) {
    Logger.error('aborting download due to component unmount', error);
  }
  return null;
}
