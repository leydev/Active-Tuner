async function getStream(constraints?: MediaStreamConstraints): Promise<MediaStream> {
  const { mediaDevices } = navigator;
  let mediaStream: MediaStream;

  try {
    mediaStream = await mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.error(error);
  }

  return mediaStream;
}

export default getStream;
