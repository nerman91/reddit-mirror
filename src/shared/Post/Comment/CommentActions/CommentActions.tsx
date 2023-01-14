import React from 'react';
import { KarmaCounter } from '../../../CardList/Card/Controls/KarmaCounter';
import { EIcons, Icon } from '../../../Icon';
import { EColors, Text } from '../../../Text';
import styles from './commentactions.css';

interface ICommentActionsProps {
  isOpenedForm: boolean;
  score: number;
  onClickAnsver: (isOpenedForm: boolean) => void;
}

export function CommentActions({
  isOpenedForm,
  score,
  onClickAnsver
}: ICommentActionsProps) {
  return (
    <div className={styles.actions}>
      <KarmaCounter carmaCount={score} />
      <button
        className={styles.reply}
        onClick={() => onClickAnsver(!isOpenedForm)}>
        <Icon name={EIcons.comments} size={16} />
        <Text As="span" size={14} mobileSize={12} color={EColors.grey66}>
          Ответить
        </Text>
      </button>

      <div className={styles.actionsDesktop}>
        <button className={styles.sharedDesktop}>
          <Icon name={EIcons.shared} size={16} />
          <Text As="span" size={14} color={EColors.grey66}>
            Поделиться
          </Text>
        </button>
        <button className={styles.complaintDesktop}>
          <Icon name={EIcons.complaint} size={16} />
          <Text As="span" size={14} color={EColors.grey66}>
            Пожаловаться
          </Text>
        </button>
      </div>

      <div className={styles.actionsMobile}>
        <button className={styles.sharedMobile}>
          <Icon name={EIcons.sharedMobile} size={20} />
        </button>
        <button className={styles.complaintMobile}>
          <Icon name={EIcons.complaintMobile} size={20} />
        </button>
      </div>
    </div>
  );
}
