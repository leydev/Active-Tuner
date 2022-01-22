import {
  PropsWithChildren, useEffect, useRef, useState,
} from 'react';

interface PitchDisplayProps {
  onLoaded: (ref: HTMLCanvasElement) => void,
  style?: React.CSSProperties
}

export function PitchDisplay(props: PropsWithChildren<PitchDisplayProps>) {
  const { children, onLoaded, style } = props;
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    if (canvasRef) onLoaded(canvasRef.current);
  }, [canvasRef, onLoaded]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth < window.innerHeight ? window.innerHeight : window.innerWidth}
      height="350"
      style={style}
    >
      {children}
    </canvas>
  );
}

PitchDisplay.defaultProps = {
  style: {},
};

export default PitchDisplay;
