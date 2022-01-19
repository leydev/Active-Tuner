async function getDevices(type?: MediaDeviceKind): Promise<MediaDeviceInfo[]> {
  const { mediaDevices } = navigator;
  const mediaStream: MediaDeviceInfo[] = [];

  try {
    mediaStream.push(...await mediaDevices.enumerateDevices());
  } catch (error) {
    console.error(error);
  }

  if (type) return mediaStream.filter(({ kind }) => kind === type);
  return mediaStream;
}

export default getDevices;
