import React from 'react';
import { FormActions } from './FormActions';
import { FormArea } from './FormArea';
import { EIcons, Icon } from '../../Icon';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../store/reducers/root';
import styles from './formcomment.css';

interface ICommentFormProps {
  commentId: string;
}

export function FormComment({ commentId }: ICommentFormProps) {
  interface IFormValue {
    comment: string;
  }

  interface IFormError {
    comment?: string;
  }

  const getValueFromStore = (
    arr: { value: string; id: string }[],
    id: string
  ) => {
    const comment = arr.find((comment) => comment.id === id);
    if (comment) {
      return comment.value;
    } else {
      return '';
    }
  };

  const storeValue = useSelector<IRootState, string>((state) =>
    getValueFromStore(state.savedComments, commentId)
  );

  const initialValues: IFormValue = { comment: storeValue };

  const validate = (values: IFormValue) => {
    const errors: IFormError = {};
    if (!values.comment) errors.comment = 'Required';

    return errors;
  };

  const formic = useFormik({
    initialValues,
    validate,
    onSubmit: () => console.log('Данные отправлены!')
  });

  const isInValid = !!formic.errors.comment && !!formic.touched.comment;

  return (
    <form className={styles.form} onSubmit={formic.handleSubmit}>
      <button className={styles.btnPlus} type="button">
        <Icon name={EIcons.plus} size={20} />
      </button>
      <FormArea
        commentId={commentId}
        value={formic.values.comment}
        isInValid={isInValid}
        handleChange={formic.handleChange}
        isTouched={formic.handleBlur}
      />
      <FormActions isInValid={isInValid} />
    </form>
  );
}
