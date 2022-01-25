import type { PropsWithChildren, CSSProperties } from 'react';

export interface DialogActionsProps {
  justifyContent?: CSSProperties['justifyContent']
}

export function DialogActions(props: PropsWithChildren<DialogActionsProps>) {
  const { children, justifyContent } = props;
  return (
    <div className="pt-3 flex" style={{ justifyContent }}>
      {children}
    </div>
  );
}

export default DialogActions;
