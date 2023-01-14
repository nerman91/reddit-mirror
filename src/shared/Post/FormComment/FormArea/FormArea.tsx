import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store/reducers/root';
import { IUserData } from '../../../../store/actions/me';
import styles from './formarea.css';
import {
  removeComment,
  setComment
} from '../../../../store/actions/savedComments';
import classNames from 'classnames';

interface IFormAreaProps {
  commentId: string;
  value: string;
  isInValid: boolean | undefined;
  handleChange: (e: React.ChangeEvent) => void;
  isTouched: (e: React.FocusEvent) => void;
}

export function FormArea({
  commentId,
  value,
  isInValid,
  handleChange,
  isTouched
}: IFormAreaProps) {
  const [isFocusArea, setIsFocusArea] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const { name } = useSelector<IRootState, IUserData>((state) => state.me.data);

  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(removeComment(commentId));
    setIsFocusArea(true);
  };

  const handleBlur = () => {
    if (value.trim()) {
      dispatch(setComment(value.trim(), commentId));
    }
  };

  React.useEffect(() => {
    const inputArea = textAreaRef.current;

    if (!inputArea) return;
    if (value) setIsFocusArea(true);

    inputArea.addEventListener('focus', handleFocus);
    return () => {
      inputArea.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div className={styles.inputWrapper}>
      {!isFocusArea && (
        <label className={styles.inputPromt}>
          {innerWidth < 1024 ? (
            'Ваш комментарий'
          ) : (
            <>
              <span className={styles.inputUser}>
                {`${name ? name : 'Аноним'}, `}
              </span>
              оставьте ваш комментарий
            </>
          )}
        </label>
      )}
      <textarea
        className={classNames(styles.input, {
          [styles.inputInvalid]: isInValid
        })}
        value={value}
        name="comment"
        ref={textAreaRef}
        onChange={handleChange}
        onBlur={(event) => {
          handleBlur();
          isTouched(event);
        }}
      />
    </div>
  );
}
