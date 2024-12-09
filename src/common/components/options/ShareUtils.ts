 
export async function handleSaveVideo(
  videoPath: string,
  fileName?: string,
): Promise<void> {
  const blob = await fetch(videoPath).then(res => res.blob());

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.addEventListener('load', () => {
      const elem = document.createElement('a');
      elem.download = fileName ?? getFileName();
      if (typeof reader.result === 'string') {
        elem.href = reader.result;
      }
      elem.click();
      resolve();
    });
  });
}

export function getFileName() {
  const date = new Date();
  const timestamp = date.getTime();
  return `sam2_masked_video_${timestamp}.mp4`;
}
