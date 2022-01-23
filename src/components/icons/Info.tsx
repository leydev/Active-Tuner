import { PropsWithChildren, SVGAttributes } from 'react';

export interface InfoProps {
  style?: SVGAttributes<SVGSVGElement>['style'];
  width?: SVGAttributes<SVGSVGElement>['width'];
  height?: SVGAttributes<SVGSVGElement>['height'];
  color?: SVGAttributes<SVGSVGElement>['fill']
}

export function Info(props: PropsWithChildren<InfoProps>) {
  const {
    style, width, height, color,
  } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={style} width={width} height={height} viewBox="0 0 40 40" fill="none">
      <path d="M18.3333 11.6667H21.6666V15H18.3333V11.6667ZM18.3333 18.3333H21.6666V28.3333H18.3333V18.3333ZM20 3.33334C10.8 3.33334 3.33331 10.8 3.33331 20C3.33331 29.2 10.8 36.6667 20 36.6667C29.2 36.6667 36.6666 29.2 36.6666 20C36.6666 10.8 29.2 3.33334 20 3.33334ZM20 33.3333C12.65 33.3333 6.66665 27.35 6.66665 20C6.66665 12.65 12.65 6.66668 20 6.66668C27.35 6.66668 33.3333 12.65 33.3333 20C33.3333 27.35 27.35 33.3333 20 33.3333Z" fill={color} />
    </svg>
  );
}

Info.defaultProps = {
  color: '#000',
  width: '25px',
  height: '25px',
};

export default Info;
