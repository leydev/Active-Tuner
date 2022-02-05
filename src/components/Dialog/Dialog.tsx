import type { PropsWithChildren, CSSProperties } from 'react';

export interface DialogProps {
  /** The dialog title */
  title: string;
  /** open or close dialog  */
  open: boolean;
  style?: CSSProperties;
}

export function Dialog(props: PropsWithChildren<DialogProps>) {
  const {
    title, children, open, style,
  } = props;
  return (
    <div
      className="fixed w-screen h-screen top-0 flex justify-center items-center px-4"
      style={{
        visibility: open ? 'visible' : 'hidden',
        backgroundColor: 'rgba(0,0,0,0.33)',
      }}
    >
      <div className="p-7 bg-white rounded-md font-medium max-w-md" style={style}>
        <span className="text-lg block text-center">{title}</span>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
