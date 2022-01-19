import { PropsWithChildren, useCallback, MouseEvent } from 'react';

export interface ItemButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  active?: boolean;
}

export function ItemButton(props: PropsWithChildren<ItemButtonProps>) {
  const { children, onClick, active } = props;

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (typeof onClick === 'function') onClick(event);
  }, [onClick]);

  return (
    <li
      className={`py-2 px-8 ${active ? 'active' : ''}`}
    >
      <button type="button" className="w-full h-full text-left" onClick={(event) => handleClick(event)}>
        {children}
      </button>
    </li>
  );
}

export default ItemButton;
