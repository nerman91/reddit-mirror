import React from 'react';
import { Text, EColors } from '../../../Text';
import { Icon, EIcons } from '../../../Icon';
import { generateId } from '../../../../utils/react/geterateRandomIndex';
import styles from './formactions.css';

const actionsFormDesktop = [
  {
    icon: <Icon name={EIcons.code} size={20} />
  },
  {
    icon: <Icon name={EIcons.page} size={20} />
  },
  {
    icon: <Icon name={EIcons.document} size={20} />
  },
  {
    icon: <Icon name={EIcons.download} size={20} />
  },
  {
    icon: <Icon name={EIcons.contact} size={20} />
  },
  {
    icon: <Icon name={EIcons.refresh} size={20} />
  },
  {
    icon: <Icon name={EIcons.link} size={20} />
  },
  {
    icon: <Icon name={EIcons.voise} size={20} />
  },
  {
    icon: <Icon name={EIcons.dialog} size={20} />
  },
  {
    icon: <Icon name={EIcons.paint} size={20} />
  },
  {
    icon: <Icon name={EIcons.superscript} size={20} />
  },
  {
    icon: <Icon name={EIcons.png} size={20} />
  }
].map(generateId);

interface IFormActionsProps {
  isInValid: boolean;
}

export function FormActions({ isInValid }: IFormActionsProps) {
  return (
    <div className={styles.formActions}>
      <ul className={styles.listActions}>
        {actionsFormDesktop.map((element) => (
          <li key={element.id}>
            <button type="button">{element.icon}</button>
          </li>
        ))}
      </ul>

      <button className={styles.smiles}>
        <Icon name={EIcons.smile} size={20} />
      </button>

      <button className={styles.addComment} disabled={isInValid} type="submit">
        <Text As="span" size={14} color={EColors.white}>
          Комментировать
        </Text>
        <Icon name={EIcons.arrowUp} size={14} />
      </button>
    </div>
  );
}
