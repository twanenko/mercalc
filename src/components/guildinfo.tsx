import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

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

const GuildInfo = () => {
  const classes = useStyles();
  /** 自分のギルド */
  const myGuildName = useSelector(
    (state: RootState) => state.prayer.myGuildName
  );
  /** ギルド一覧 */
  const guild = useSelector((state: RootState) => state.prayer.guild);

  const [summery, setSummery] = useState('');
  useEffect(() => {
    const getGuildText = (guildName: string) => {
      const myGuild = guild.find((g) => g.name === guildName);
      if (!myGuild) return '';
      if (myGuildName === guildName) return '';
      const title = myGuild.title;
      const prayed = myGuild.prayed.toLocaleString();
      const modified = myGuild.modified;
      return `${title}:${prayed}%${modified} `;
    };
    setSummery(
      `${getGuildText('yellow')}${getGuildText('red')}${getGuildText(
        `gate`
      )}${getGuildText('blue')}${getGuildText('green')}`
    );
  }, [guild, myGuildName]);

  /** コピペボタンのtooltip */
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
          value={summery}
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
                <CopyToClipBoard text={summery}>
                  <IconButton
                    disabled={summery === ''}
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

export default GuildInfo;
