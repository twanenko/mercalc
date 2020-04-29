import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  yellow,
  brown,
  red,
  grey,
  blue,
  green,
} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { timerContext, useTimer } from './contexts/timer';
import { guildContext, useGuild } from './contexts/guild';
import { myGuildContext, useMyGuild } from './contexts/is-my-guild';
import Guild from './components/guild';
import MyGuild from './components/is-my-guild';
import Timer from './components/timer';
import SummeryText from './components/summery';

export type Seed = {
  name: string;
  link: string;
  img: string;
  elem: string;
  hp: number;
  interval: number;
  reach: number;
  range: number;
  targets: number;
  times: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      backgroundColor: '#282c34',
      color: 'white',
    },
    appHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
    },
    appMain: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
    },
    container: { flexGrow: 1 },
    text: { color: 'white' },
  })
);

const guildStyles = {
  guildY: {
    backgroundColor: yellow[100],
    color: brown[600],
  },
  guildR: {
    backgroundColor: red[100],
    color: red[900],
  },
  gate: {
    backgroundColor: grey[200],
    color: grey[900],
  },
  guildB: {
    backgroundColor: blue[100],
    color: blue[900],
  },
  guildG: {
    backgroundColor: green[100],
    color: green[900],
  },
};

const App = () => {
  const classes = useStyles();
  /**
   * シード情報seed
   */
  const [seed, setSeed] = useState<Seed[] | null>(null);
  useEffect(() => {
    fetch(
      'https://script.google.com/macros/s/AKfycbyt5WB_eEoamADwxePfKQxk3umq5khBbCeaIdRnLOTCeVHzkj0/exec'
    )
      .then((response) => response.json())
      .then((data) => {
        const seeds = data as Seed[];
        setSeed(seeds);
      });
  }, []);
  /**
   * contextになっているtime
   */
  const timeCtx = useTimer();

  /**
   * contextになっているギルドの祈り値
   */
  const guildYCtx = useGuild();
  const guildRCtx = useGuild();
  const gateCtx = useGuild();
  const guildBCtx = useGuild();
  const guildGCtx = useGuild();
  /**
   * contextになっている自ギルト
   */
  const myGuildCtx = useMyGuild();

  /**
   * 祈り値まとめ
   */
  const [summery, setSummery] = useState('');
  useEffect(() => {
    const guildY =
      myGuildCtx.myGuild !== 'yellow' ? `左上(黄):${guildYCtx.prayed} ` : '';
    const guildR =
      myGuildCtx.myGuild !== 'red' ? `右上(赤):${guildRCtx.prayed} ` : '';
    const gate = `ゲート(門):${gateCtx.prayed} `;
    const guildB =
      myGuildCtx.myGuild !== 'blue' ? `左下(青):${guildBCtx.prayed} ` : '';
    const guildG =
      myGuildCtx.myGuild !== 'green' ? `右下(緑):${guildGCtx.prayed}` : '';
    const sumText = `${guildY}${guildR}${gate}${guildB}${guildG}`;
    setSummery(sumText);
  }, [
    gateCtx.prayed,
    guildBCtx.prayed,
    guildGCtx.prayed,
    guildRCtx.prayed,
    guildYCtx.prayed,
    myGuildCtx.myGuild,
  ]);

  return (
    <div className={classes.app}>
      <div className={classes.appHeader}>
        <p>メルストお祈り計算機</p>
      </div>
      <main className={classes.appMain}>
        <Container className={classes.container}>
          <timerContext.Provider value={timeCtx}>
            <Timer />
          </timerContext.Provider>
          <myGuildContext.Provider value={myGuildCtx}>
            <MyGuild />
          </myGuildContext.Provider>
          <SummeryText value={summery} />
          <Grid container spacing={3}>
            <Grid item xs>
              <guildContext.Provider value={guildYCtx}>
                <Guild
                  name="左上(黄)"
                  cardStyle={guildStyles.guildY}
                  minute={timeCtx.timer}
                  seedList={seed}
                />
              </guildContext.Provider>
            </Grid>
            <Grid item xs></Grid>
            <Grid item xs>
              <guildContext.Provider value={guildRCtx}>
                <Guild
                  name="右上(赤)"
                  cardStyle={guildStyles.guildR}
                  minute={timeCtx.timer}
                  seedList={seed}
                />
              </guildContext.Provider>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs>
              <guildContext.Provider value={gateCtx}>
                <Guild
                  name="ゲート(門)"
                  cardStyle={guildStyles.gate}
                  minute={timeCtx.timer}
                  seedList={seed}
                />
              </guildContext.Provider>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <guildContext.Provider value={guildBCtx}>
                <Guild
                  name="左下(青)"
                  cardStyle={guildStyles.guildB}
                  minute={timeCtx.timer}
                  seedList={seed}
                />
              </guildContext.Provider>
            </Grid>
            <Grid item xs></Grid>
            <Grid item xs>
              <guildContext.Provider value={guildGCtx}>
                <Guild
                  name="右下(緑)"
                  cardStyle={guildStyles.guildG}
                  minute={timeCtx.timer}
                  seedList={seed}
                />
              </guildContext.Provider>
            </Grid>
          </Grid>
        </Container>
        <span>tw: @twanenko</span>
      </main>
    </div>
  );
};

export default App;
