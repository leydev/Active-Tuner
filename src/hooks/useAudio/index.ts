import { useCallback, useEffect, useState } from 'react';
import getDevices from './getDevices';
import getStream from './getStream';

function useAudio(contextOptions?: AudioContextOptions) {
  const [audioContext] = useState<AudioContext>(new AudioContext(contextOptions));
  const [analyzerNode] = useState<AnalyserNode>(audioContext.createAnalyser());
  const [deviceSettings, setDeviceSettings] = useState<MediaTrackSettings>({});
  const [streamAudioSource, setStreamAudioSource] = useState<MediaStreamAudioSourceNode>();

  const getFloatTimeDomain = useCallback((bufferSize: number) => {
    const data: Float32Array = new Float32Array(bufferSize);

    analyzerNode.getFloatTimeDomainData(data);

    return data;
  }, [analyzerNode]);

  const getByteTimeDomain = useCallback((bufferSize: number) => {
    const data: Uint8Array = new Uint8Array(bufferSize);

    analyzerNode.getByteTimeDomainData(data);

    return data;
  }, [analyzerNode]);

  const destroyStream = useCallback(() => {
    if (streamAudioSource) {
      streamAudioSource.disconnect();
      streamAudioSource.mediaStream.getAudioTracks()[0].stop();
    }
  }, [streamAudioSource]);

  // eslint-disable-next-line arrow-body-style
  const createStream = useCallback((constraints?: MediaStreamConstraints) => {
    return new Promise((resolve, reject) => {
      getStream(constraints)
        .then((value: MediaStream) => audioContext.createMediaStreamSource(value))
        .then((streamSource: MediaStreamAudioSourceNode) => {
          setStreamAudioSource(streamSource);
          setDeviceSettings(streamSource.mediaStream.getAudioTracks()[0].getSettings());
          streamSource.connect(analyzerNode);
          analyzerNode.connect(audioContext.destination);
          resolve(undefined);
        })
        .catch((error) => reject(error));
    });
  }, [analyzerNode, audioContext]);

  useEffect(() => {
    analyzerNode.fftSize = 2048;
  }, [analyzerNode, audioContext]);

  return {
    getDevices,
    createStream,
    getByteTimeDomain,
    getFloatTimeDomain,
    resume: () => audioContext.resume(),
    pause: () => audioContext.suspend(),
    status: audioContext.state,
    deviceSettings,
    destroyStream,
  };
}

export default useAudio;
