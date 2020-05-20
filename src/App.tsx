import React, { useEffect } from 'react';
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
import Timer from './components/timer';
import GuildPref from './components/guildpref';
import GuildInfo from './components/guildinfo';
import Guild, { GuildProps } from './components/guild';
import { useAppDispatch } from './store';
import { fetchSeedList } from './modules/prayerModule';

/** App大枠のcss */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      backgroundColor: '#282c34',
      color: 'white',
    },
    appMain: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      fontSize: 'calc(10px + 2vmin)',
    },
    header: {
      display: 'block',
      marginBlockStart: '1em',
    },
    container: { flexGrow: 1 },
  })
);

/** 各ギルドの初期表示設定 */
type GuildKeys = 'guildY' | 'guildR' | 'gate' | 'guildB' | 'guildG';
type GuildPref = {
  [K in GuildKeys]: GuildProps;
};
/** 各ギルドの初期設定 */
const guildProps: GuildPref = {
  guildY: {
    name: 'yellow',
    guildStyle: {
      backgroundColor: yellow[100],
      color: brown[600],
    },
  },
  guildR: {
    name: 'red',
    guildStyle: {
      backgroundColor: red[100],
      color: red[900],
    },
  },
  gate: {
    name: 'gate',
    guildStyle: {
      backgroundColor: grey[200],
      color: grey[900],
    },
  },
  guildB: {
    name: 'blue',
    guildStyle: {
      backgroundColor: blue[100],
      color: blue[900],
    },
  },
  guildG: {
    name: 'green',
    guildStyle: {
      backgroundColor: green[100],
      color: green[900],
    },
  },
};

const App = () => {
  const classes = useStyles();
  /**
   * シード情報を取得、stateに反映させる
   * とりあえずここでやっている
   */
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchSeedList(
        'https://script.google.com/macros/s/AKfycbyt5WB_eEoamADwxePfKQxk3umq5khBbCeaIdRnLOTCeVHzkj0/exec'
      )
    );
  }, [dispatch]);

  return (
    <div className={classes.app}>
      <main className={classes.appMain}>
        <Container className={classes.container}>
          <div className={classes.header}>メルストお祈り計算機</div>
          <Timer />
          <GuildPref />
          <GuildInfo />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <Guild {...guildProps.guildY} />
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={5}>
              <Guild {...guildProps.guildR} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={false} sm={3}></Grid>
            <Grid item xs={12} sm={6}>
              <Guild {...guildProps.gate} />
            </Grid>
            <Grid item xs={false} sm={3}></Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <Guild {...guildProps.guildB} />
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={5}>
              <Guild {...guildProps.guildG} />
            </Grid>
          </Grid>
        </Container>
        <span>tw: @twanenko</span>
      </main>
    </div>
  );
};

export default App;
