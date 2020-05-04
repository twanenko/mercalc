import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import CopyToClipBoard from 'react-copy-to-clipboard';

type Summery = {
  value: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 0 1em',
    },
    text: {
      borderColor: 'white',
      color: 'white',
    },
  })
);

const SummeryText = ({ value }: Summery) => {
  const classes = useStyles();

  const [openTip, setOpenTip] = useState(false);
  const handleCloseTip = () => {
    setOpenTip(false);
  };
  const handleClickButton = () => {
    setOpenTip(true);
  };

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" fullWidth={true}>
        <InputLabel htmlFor="summery" className={classes.text}>
          コピペ用
        </InputLabel>
        <Input
          className={classes.text}
          id="summery"
          margin="dense"
          type="text"
          value={value}
          startAdornment={
            <InputAdornment position="start">
              <Tooltip
                arrow
                open={openTip}
                onClose={handleCloseTip}
                disableHoverListener
                placement="top"
                title="copied"
              >
                <CopyToClipBoard text={value}>
                  <IconButton
                    disabled={value === ''}
                    onClick={handleClickButton}
                  >
                    <AssignmentIcon className={classes.text} />
                  </IconButton>
                </CopyToClipBoard>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default SummeryText;
