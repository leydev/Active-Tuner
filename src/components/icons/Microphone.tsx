import { PropsWithChildren, SVGAttributes } from 'react';

export interface MicrophoneProps {
  style?: SVGAttributes<SVGSVGElement>['style'];
  width?: SVGAttributes<SVGSVGElement>['width'];
  height?: SVGAttributes<SVGSVGElement>['height'];
  color?: SVGAttributes<SVGSVGElement>['fill']
}

export function Microphone(props: PropsWithChildren<MicrophoneProps>) {
  const {
    style, width, height, color,
  } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={style} width={width} height={height} viewBox="0 0 50 50" fill="none">
      <path d="M25.3462 29.9231C21.6218 29.9231 18.6154 26.9167 18.6154 23.1923V9.73077C18.6154 6.00641 21.6218 3 25.3462 3C29.0705 3 32.0769 6.00641 32.0769 9.73077V23.1923C32.0769 26.9167 29.0705 29.9231 25.3462 29.9231Z" fill={color} />
      <path d="M13.6703 24.1538C13.6703 30.5231 18.9011 35.6923 25.3462 35.6923C31.7912 35.6923 37.022 30.5231 37.022 24.1538H41.6923C41.6923 32.3 35.5975 38.9923 27.6813 40.1231V47.2308H23.011V40.1231C15.0948 38.9923 9 32.3 9 24.1538H13.6703Z" fill={color} />
    </svg>
  );
}

Microphone.defaultProps = {
  color: '#000',
  width: '25px',
  height: '25px',
};

export default Microphone;
