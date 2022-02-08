import type { PropsWithChildren, SVGAttributes } from 'react';

export interface MoonSunProps {
  style?: SVGAttributes<SVGSVGElement>['style'];
  width?: SVGAttributes<SVGSVGElement>['width'];
  height?: SVGAttributes<SVGSVGElement>['height'];
  color?: SVGAttributes<SVGSVGElement>['fill']
}

export function MoonSun(props: PropsWithChildren<MoonSunProps>) {
  const {
    style, width, height, color,
  } = props;
  return (
    <svg style={style} width={width} height={height} fill={color} viewBox="0 0 296 296" xmlns="http://www.w3.org/2000/svg">
      <path d="M252.667 104.694V43.3334H191.306L148 0.0275879L104.694 43.3334H43.3333V104.694L0.0274658 148L43.3333 191.306V252.667H104.694L148 295.973L191.306 252.667H252.667V191.306L295.972 148L252.667 104.694ZM226.5 180.447V226.5H180.447L148 258.947L115.553 226.5H69.5V180.447L37.0533 148L69.5 115.553V69.5001H115.553L148 37.0534L180.447 69.5001H226.5V115.553L258.947 148L226.5 180.447ZM151.794 82.5834C142.112 82.5834 132.823 84.8076 124.581 88.6018C147.084 98.9376 162.784 121.703 162.784 148C162.784 174.298 147.084 197.063 124.581 207.398C132.823 211.193 142.112 213.417 151.794 213.417C187.904 213.417 217.211 184.11 217.211 148C217.211 111.89 187.904 82.5834 151.794 82.5834Z" fill={color} />
    </svg>
  );
}

MoonSun.defaultProps = {
  color: '#000',
  width: '25px',
  height: '25px',
};

export default MoonSun;
