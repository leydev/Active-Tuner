function microphoneName(microphone: MediaDeviceInfo) {
  if (/default/i.test(microphone.deviceId)) {
    return 'Microphone padrão';
  }

  if (!microphone.label) {
    return `Microphone - ${microphone.deviceId}`;
  }

  return microphone.label;
}

export default microphoneName;
