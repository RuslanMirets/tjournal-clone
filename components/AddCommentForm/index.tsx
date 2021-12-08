import { Button, Input } from '@material-ui/core';
import React from 'react';
import styles from './AddCommentForm.module.scss';

interface AddCommentFormProps {}

export const AddCommentForm: React.FC<AddCommentFormProps> = () => {
  const [clicked, setClicked] = React.useState(false);
  const [text, setText] = React.useState('');

  const onAddComment = () => {
    setClicked(false);
    setText('');
  };

  return (
    <div className={styles.form}>
      <Input
        classes={{ root: styles.fieldRoot }}
        onFocus={() => setClicked(true)}
        minRows={clicked ? 5 : 1}
        placeholder="Написать комментарий..."
        fullWidth
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {clicked && (
        <Button
          className={styles.addButton}
          variant="contained"
          color="primary"
          onClick={onAddComment}>
          Отправить
        </Button>
      )}
    </div>
  );
};
