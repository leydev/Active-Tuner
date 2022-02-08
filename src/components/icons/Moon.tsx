import type { PropsWithChildren, SVGAttributes } from 'react';

export interface MoonProps {
  style?: SVGAttributes<SVGSVGElement>['style'];
  width?: SVGAttributes<SVGSVGElement>['width'];
  height?: SVGAttributes<SVGSVGElement>['height'];
  color?: SVGAttributes<SVGSVGElement>['fill']
}

export function Moon(props: PropsWithChildren<MoonProps>) {
  const {
    style, width, height, color,
  } = props;
  return (
    <svg style={style} width={width} height={height} fill={color} viewBox="0 0 228 228" xmlns="http://www.w3.org/2000/svg">
      <path d="M80.6867 31.7933C78.4067 39.9 77.2667 48.3867 77.2667 57C77.2667 108.68 119.32 150.733 171 150.733C179.613 150.733 188.1 149.593 196.207 147.313C183.033 179.74 151.113 202.667 114 202.667C65.1067 202.667 25.3333 162.893 25.3333 114C25.3333 76.8867 48.26 44.9667 80.6867 31.7933ZM114 0C51.0467 0 0 51.0467 0 114C0 176.953 51.0467 228 114 228C176.953 228 228 176.953 228 114C228 108.173 227.493 102.347 226.733 96.7733C214.32 114.127 194.053 125.4 171 125.4C133.253 125.4 102.6 94.7467 102.6 57C102.6 34.0733 113.873 13.68 131.227 1.26667C125.653 0.506665 119.827 0 114 0Z" fill={color} />
    </svg>
  );
}

Moon.defaultProps = {
  color: '#000',
  width: '25px',
  height: '25px',
};

export default Moon;
