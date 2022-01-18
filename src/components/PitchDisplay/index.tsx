import {
  PropsWithChildren, useRef, useEffect,
} from 'react';

import useRender from '@/hooks/useRender';

export interface PitchDisplayProps {
  bufferLength: number;
  buffer: Uint8Array;
  update: () => void;
  text: string,
}

export function PitchDisplay(props: PropsWithChildren<PitchDisplayProps>) {
  const {
    buffer, bufferLength, update, text,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    setBuffer, setBufferLength, setText, setCanvas, setUpdate,
  } = useRender({ bufferLength: 2048, autoinit: true });

  useEffect(() => {
    setBufferLength(bufferLength);
    setBuffer(buffer);
    setText(text);
    setUpdate(update);
  }, [
    buffer,
    bufferLength,
    setBuffer,
    setBufferLength,
    setText,
    update,
    setUpdate,
    text,
  ]);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
    }
  }, [setCanvas]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default PitchDisplay;
