import React from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.css';

interface IDropdownProps {
  refBtn: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  isOpen?: boolean;
  moreStyles?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

interface IPositionValues {
  [value: string]: number;
}

type StatePosition = IPositionValues | null;

const NOOP = () => {};

export function Dropdown({
  children,
  isOpen,
  moreStyles,
  refBtn,
  onOpen = NOOP,
  onClose = NOOP
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  const [position, setPosition] = React.useState<StatePosition>(null);
  const node = document.getElementById('modal-root');

  if (!node) return null;

  const getPosition = (ref: React.RefObject<HTMLButtonElement> = refBtn) => {
    if (ref.current && isDropdownOpen) {
      const rect = ref.current?.getBoundingClientRect();
      const { top, left, width, height } = rect;
      setPosition({
        top: window.scrollY + top,
        left,
        width,
        height
      });
    }
  };

  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);

  React.useEffect(() => {
    getPosition();
    isDropdownOpen ? onOpen() : onClose();
  }, [isDropdownOpen]);

  React.useEffect(() => {
    window.addEventListener('resize', () => getPosition);
    return () => window.removeEventListener('resize', () => getPosition());
  }, [isDropdownOpen]);

  return (
    <>
      {isDropdownOpen &&
        ReactDOM.createPortal(
          <div
            className={styles.listContainer}
            style={{
              top: Math.round(position ? position.top + position?.height : 0),
              left: Math.round(
                position ? position.left + position.width / 2 : 0
              )
            }}>
            <div
              className={styles.list + moreStyles ? moreStyles : ''}
              onClick={() => setIsDropdownOpen(false)}>
              {children}
            </div>
          </div>,
          node
        )}
    </>
  );
}
