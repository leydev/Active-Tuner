import { PropsWithChildren, MouseEventHandler } from 'react';

export interface ButtonProps {
  /** The button type. Ex: 'submit' | 'reset' | 'button'  */
  type: 'submit' | 'reset' | 'button';
  /** The button text. Ex #000000, rgb(0,0,0) or rgba(0,0,0,0.5) */
  color?: string,
  /** The color text. Ex #000000, rgb(0,0,0) or rgba(0,0,0,0.5) */
  colorText?: string
  /** icon buton */
  icon?: boolean,
  /** Event click */
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  const {
    children, type, color, colorText, icon, onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-xl py-0.5 px-8 font-normal ${icon ? 'icon-button' : ''}`}
      style={{
        backgroundColor: color,
        color: colorText,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
