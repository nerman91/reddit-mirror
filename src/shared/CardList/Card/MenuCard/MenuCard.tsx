import React from 'react';
import styles from './menucard.css';
import { Dropdown } from '../../../Dropdown';
import { EColors, Text } from '../../../Text';
import { MenuItemList } from './MenuItemList';
import { EIcons, Icon } from '../../../Icon';

interface IMenuCardProps {
  postId: string;
}

export function MenuCard({ postId }: IMenuCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const refBtn = React.useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.menu}>
      <button
        className={styles.menuButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        ref={refBtn}>
        <Icon name={EIcons.menu} size={20} />
      </button>
      <Dropdown
        moreStyles={styles.dropdown}
        isOpen={isDropdownOpen}
        onOpen={() => setIsDropdownOpen(true)}
        onClose={() => setIsDropdownOpen(false)}
        refBtn={refBtn}>
        <MenuItemList postId={postId} />
        <button
          className={styles.closeButton}
          onClick={() => setIsDropdownOpen(false)}>
          <Text mobileSize={12} size={14} color={EColors.grey66}>
            Закрыть
          </Text>
        </button>
      </Dropdown>
    </div>
  );
}
