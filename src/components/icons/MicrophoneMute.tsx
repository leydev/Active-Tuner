import type { PropsWithChildren, SVGAttributes } from 'react';

export interface MicrophoneMuteProps {
  style?: SVGAttributes<SVGSVGElement>['style'];
  width?: SVGAttributes<SVGSVGElement>['width'];
  height?: SVGAttributes<SVGSVGElement>['height'];
  color?: SVGAttributes<SVGSVGElement>['fill']
}

export function MicrophoneMute(props: PropsWithChildren<MicrophoneMuteProps>) {
  const {
    style, width, height, color,
  } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={style} width={width} height={height} viewBox="0 0 50 50" fill="none">
      <path d="M39.5833 22.9167H36.0417C36.0417 24.4583 35.7083 25.8958 35.1458 27.1875L37.7083 29.75C38.875 27.7083 39.5833 25.3958 39.5833 22.9167V22.9167ZM31.2083 23.2708C31.2083 23.1458 31.25 23.0417 31.25 22.9167V10.4167C31.25 6.95832 28.4583 4.16666 25 4.16666C21.5417 4.16666 18.75 6.95832 18.75 10.4167V10.7917L31.2083 23.2708ZM8.89583 6.24999L6.25 8.89582L18.7708 21.4167V22.9167C18.7708 26.375 21.5417 29.1667 25 29.1667C25.4583 29.1667 25.9167 29.1042 26.3542 29L29.8125 32.4583C28.3333 33.1458 26.6875 33.5417 25 33.5417C19.25 33.5417 13.9583 29.1667 13.9583 22.9167H10.4167C10.4167 30.0208 16.0833 35.8958 22.9167 36.9167V43.75H27.0833V36.9167C28.9792 36.6458 30.7708 35.9792 32.375 35.0417L41.1042 43.75L43.75 41.1042L8.89583 6.24999Z" fill={color} />
    </svg>
  );
}

MicrophoneMute.defaultProps = {
  color: '#000',
  width: '25px',
  height: '25px',
};

export default MicrophoneMute;
