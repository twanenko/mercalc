import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { getTimer } from '../modules/prayerModule';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 'calc(20px + 2vmin)',
      paddingInlineStart: '1vmin',
      marginBlockEnd: '1em',
      backgroundColor: '#717c91',
      color: 'white',
    },
  })
);

const Timer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  /**
   * 端末とサーバーの時刻の差分dateDiff
   */
  const [dateDiff, setDateDiff] = useState(0);
  useEffect(() => {
    const nowDate = new Date().getTime();
    // ランダムなどちらかのサーバurl
    const jsonUrl = [
      'https://ntp-a1.nict.go.jp/cgi-bin/json',
      'https://ntp-b1.nict.go.jp/cgi-bin/json',
    ][Math.floor(Math.random() * 2)];
    fetch(`${jsonUrl}?${nowDate / 1000}`)
      .then((response) => response.json())
      .then((data) => {
        setDateDiff(data.st * 1000 + (nowDate - data.it * 1000) / 2 - nowDate);
      });
  }, []);

  /**
   * dateDiffをtimeに反映
   */
  const [dateNow, setDateNow] = useState('');
  useEffect(() => {
    const timerId = setInterval(
      () =>
        setDateNow(
          moment(new Date().getTime() + dateDiff).format('HH時 mm分 ss.SS秒')
        ),
      10
    );
    return () => clearInterval(timerId);
  }, [dateDiff]);

  /**
   * stateに送る
   */
  useEffect(() => {
    const matched = dateNow.match(/\d{2}分/g);
    const minute = matched ? matched[0] : '';
    dispatch(getTimer(minute));
  }, [dateNow, dispatch]);

  return (
    <Paper className={classes.root} elevation={5}>
      <div>現在時刻(JST): {dateNow}</div>
    </Paper>
  );
};

export default Timer;
