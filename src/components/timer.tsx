import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { timerContext } from '../contexts/timer';

const Timer = () => {
  const ctx = useContext(timerContext);
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
   * ctxに送る
   */
  useEffect(() => {
    const minute = dateNow.match(/\d{2}分/g);
    ctx.updateTimer(minute ? minute[0] : '');
  }, [ctx, dateNow]);

  return (
    <header className="App-header">
      <p>現在時刻: {dateNow}</p>
    </header>
  );
};

export default Timer;
