import { PropsWithChildren, CSSProperties } from 'react';

export interface ListProps {
  justifyContent?: CSSProperties['justifyContent']
}

export function List(props: PropsWithChildren<ListProps>) {
  const { children, justifyContent } = props;
  return (
    <ul className="list" style={{ justifyContent }}>
      {children}
    </ul>
  );
}

export default List;
