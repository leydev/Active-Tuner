import { PropsWithChildren } from 'react';

export function DialogContent(props: PropsWithChildren<unknown>) {
  const { children } = props;
  return (
    <div className="pt-3 pb-0.5 font-normal">
      {children}
    </div>
  );
}

export default DialogContent;
