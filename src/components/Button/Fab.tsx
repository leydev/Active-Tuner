import {
  PropsWithChildren, useState, useCallback, useEffect,
} from 'react';

interface Options {
  Icon: React.ReactNode,
  label: string,
}

export interface FabProps {
  /** The button type. Ex: 'submit' | 'reset' | 'button'  */
  type: 'submit' | 'reset' | 'button';
  /** The button text. Ex #000000, rgb(0,0,0) or rgba(0,0,0,0.5) */
  color?: string,
  /** The color text. Ex #000000, rgb(0,0,0) or rgba(0,0,0,0.5) */
  colorText?: string
  /** icon buton */
  icon?: boolean,
  /** Event click */
  onClick?: (index: number) => void;
  style?: React.HTMLAttributes<HTMLButtonElement>['style'],
  disabled?: boolean,
  ariaLabel?: React.AriaAttributes['aria-label']
  items: Options[];
  colorIcon: string;
  labelSelected?: Options['label'];
  backgroundColor?: string;
}

export function Fab(props: PropsWithChildren<FabProps>) {
  const {
    type, color, colorText, icon, onClick, style, disabled,
    ariaLabel, items, colorIcon, labelSelected, backgroundColor,
  } = props;
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);

  const toggleDropdown = useCallback(() => {
    setDropdown((state) => !state);
  }, []);

  const handleSelected = useCallback((index: number) => {
    onClick(index);
    toggleDropdown();
    setSelected(index);
  }, [onClick, toggleDropdown]);

  useEffect(() => {
    const found = items.findIndex(({ label }) => labelSelected === label);
    if (found) setSelected(found);
  }, [labelSelected, items]);

  const getIconSelected = useCallback(() => {
    if (!items) return [];
    return [items[selected]];
  }, [selected, items]);

  return (
    <div className="relative">
      <button
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => toggleDropdown()}
        type={type}
        className={`rounded-xl py-0.5 px-8 font-normal ${icon ? 'icon-button' : ''}`}
        style={{
          backgroundColor: color,
          color: colorText,
        }}
      >
        {getIconSelected().map(({ Icon }) => <Icon color={colorIcon} key="Icon-selected" />)}
      </button>
      <div className="absolute right-0 px-3 rounded-lg" style={{ visibility: dropdown ? 'visible' : 'hidden', boxShadow: '7px 7px 12px -10px rgb(0 0 0 / 65%)', backgroundColor }}>
        {items.map(({ Icon, label }, index: number) => (
          <button key={label} className="flex py-2 options-theme" style={{ ...style }} onClick={() => handleSelected(index)}>
            <Icon color={colorIcon} />
            <span className="ml-1">{label.toLocaleUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

Fab.defaultProps = {
  style: {},
};

export default Fab;
