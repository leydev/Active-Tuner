import {
  PropsWithChildren, useEffect, useRef,
} from 'react';

interface PitchDisplayProps {
  onLoaded: (ref: HTMLCanvasElement) => void,
  style?: React.CSSProperties
}

let width = 0;
let height = 350;

if (window.innerWidth > window.innerHeight) {
  width = window.innerWidth;
} else {
  width = 720;
  height = width / 1.5;
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
      width={width}
      height={height}
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
