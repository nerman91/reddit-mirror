import React from 'react';
import { EIcons, Icon } from '../../../../Icon';
import { ActionsWrapper } from '../../ActionsWrapper';
import styles from './actions.css';

export function Actions() {
  return (
    <ActionsWrapper>
      <button className={styles.shareButton}>
        <Icon name={EIcons.sharedMobile} size={20} />
      </button>

      <button className={styles.saveButton}>
        <Icon name={EIcons.saveMobile} size={20} />
      </button>
    </ActionsWrapper>
  );
}
