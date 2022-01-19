import {
  PropsWithChildren,
} from 'react';

interface PitchDisplayProps {
  id: string;
}

export function PitchDisplay({ children, id }: PropsWithChildren<PitchDisplayProps>) {
  return (
    <canvas id={id}>
      {children}
    </canvas>
  );
}

export default PitchDisplay;
