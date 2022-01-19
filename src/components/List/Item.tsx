import { PropsWithChildren, CSSProperties } from 'react';

export interface ItemProps {
  justifyContent?: CSSProperties['justifyContent']
}

export function Item(props: PropsWithChildren<ItemProps>) {
  const { children, justifyContent } = props;

  return (
    <li
      className="py-2 px-8"
      style={{ justifyContent }}
    >
      {children}
    </li>
  );
}

export default Item;
