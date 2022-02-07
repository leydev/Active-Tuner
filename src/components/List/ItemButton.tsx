import type { PropsWithChildren, MouseEvent, CSSProperties } from 'react';
import { useCallback } from 'react';

export interface ItemButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  active?: boolean;
  style?: CSSProperties
}

export function ItemButton(props: PropsWithChildren<ItemButtonProps>) {
  const {
    children, onClick, active, style,
  } = props;

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (typeof onClick === 'function') onClick(event);
  }, [onClick]);

  return (
    <li
      className={`py-2 px-8 ${active ? 'active' : ''}`}
      style={style}
    >
      <button type="button" className="w-full h-full text-left" onClick={(event) => handleClick(event)}>
        {children}
      </button>
    </li>
  );
}

export default ItemButton;
