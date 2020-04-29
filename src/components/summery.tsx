import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type Summery = {
  value: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderColor: 'white',
    },
    text: {
      borderColor: 'white',
      color: 'white',
    },
  })
);

const SummeryText = ({ value }: Summery) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.root}
        InputLabelProps={{ className: classes.text }}
        label="コピペ用"
        fullWidth={true}
        variant="outlined"
        margin="dense"
        InputProps={{ className: classes.text }}
        value={value}
      />
    </div>
  );
};

export default SummeryText;
