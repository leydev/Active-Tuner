async function getDevices(type?: MediaDeviceKind): Promise<MediaDeviceInfo[]> {
  const mediaStream: MediaDeviceInfo[] = [];

  try {
    mediaStream.push(...await navigator.mediaDevices.enumerateDevices());
  } catch (error) {
    console.error(error);
  }

  if (type) return mediaStream.filter(({ kind }) => kind === type);
  return mediaStream;
}

export default getDevices;
