import type { PropsWithChildren } from 'react';

export function DialogContent(props: PropsWithChildren<unknown>) {
  const { children } = props;
  return (
    <div className="mt-3 pb-0.5 font-normal overflow-y-auto" style={{ maxHeight: '75vh' }}>
      {children}
    </div>
  );
}

export default DialogContent;
