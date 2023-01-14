import React from 'react';
import styles from './menuitemlist.css';
import { merge } from '../../../../../utils/js/merge';
import { generateId } from '../../../../../utils/react/geterateRandomIndex';
import { GenericList } from '../../../../../utils/react/GenericList';
import { EColors, Text } from '../../../../Text';
import { EIcons, Icon } from '../../../../Icon';

interface IMenyItemListProps {
  postId: string;
}

const elementsMenu = [
  {
    content: (
      <>
        <Icon name={EIcons.comments} size={14} />
        <Text size={12} desktopSize={14} color={EColors.grey99}>
          Комментарии
        </Text>
      </>
    ),
    className: styles.menuItem + ' ' + styles.menuItemDesktop
  },
  {
    content: (
      <>
        <Icon name={EIcons.shared} size={14} />
        <Text size={12} desktopSize={14} color={EColors.grey99}>
          Поделиться
        </Text>
      </>
    ),
    className: styles.menuItem + ' ' + styles.menuItemDesktop
  },
  {
    content: (
      <>
        <Icon name={EIcons.hide} size={14} />
        <Text size={12} desktopSize={14} color={EColors.grey99}>
          Скрыть
        </Text>
      </>
    ),
    className: styles.menuItem
  },
  {
    content: (
      <>
        <Icon name={EIcons.save} size={14} />
        <Text size={12} desktopSize={14} color={EColors.grey99}>
          Сохранить
        </Text>
      </>
    ),
    className: styles.menuItem + ' ' + styles.menuItemDesktop
  },
  {
    content: (
      <>
        <Icon name={EIcons.complaint} size={16} />
        <Text size={12} desktopSize={14} color={EColors.grey99}>
          Пожаловаться
        </Text>
      </>
    ),
    className: styles.menuItem
  }
].map(generateId);

export function MenuItemList({ postId }: IMenyItemListProps) {
  return (
    <div className={styles.menuItemsList}>
      <GenericList
        list={elementsMenu.map(
          merge({ As: 'button' as const, onClick: () => console.log(postId) })
        )}
      />
    </div>
  );
}
