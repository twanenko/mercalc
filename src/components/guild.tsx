import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { Seed } from '../App';
import { guildContext } from '../contexts/guild';

const waves = [
  { value: '1', label: '1体目' },
  { value: '1.2', label: '2体目' },
  { value: '1.4', label: '3体目' },
  { value: '1.6', label: '4体目' },
  { value: '1.8', label: '5体目' },
];

type GuildProps = {
  minute: string;
  name: string;
  cardStyle: {
    backgroundColor: string;
    color: string;
  };
  seedList: Seed[] | null;
};

const Guild = ({ minute, name, cardStyle, seedList }: GuildProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        backgroundColor: cardStyle.backgroundColor,
        color: cardStyle.color,
        padding: theme.spacing(2),
      },
    })
  );
  const classes = useStyles();

  /**
   * autocompleteで、平仮名でも検索にかかるようにする
   */
  const filterOptions = createFilterOptions({
    stringify: (option: Seed) => {
      const hiragana = option.name.replace(/[\u30a1-\u30f6]/g, (match) => {
        const chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
      });
      return `${option.name}_${hiragana}`;
    },
  });
  /**
   * appに送るcontext
   * 例:0,000%@00分
   */
  const ctx = useContext(guildContext);
  /**
   * 入力時の経過時間modified
   * TODO setModifiedは祈り値が更新されたときのみ走らせる
   */
  const initialModified = minute;
  const [modified, setModified] = useState(initialModified);
  /**
   * 選択されたseed
   */
  const [seed, setSeed] = useState<Seed | null>(null);
  const handleSeedChange = (e: React.ChangeEvent<{}>, value: Seed | null) => {
    setSeed(value);
    setModified(minute);
  };
  /**
   * 入力された体力hp
   */
  const [hp, setHp] = useState(0);
  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 「+''」は0なのでnumberで返るぞ
    setHp(+e.target.value);
    setModified(minute);
  };
  /**
   * 相手のwave数
   */
  const [wave, setWave] = useState('1');
  const handleWaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWave(e.target.value);
  };
  /**
   * 祈りprayed
   */
  useEffect(() => {
    if (!seed) return;
    if (!hp) return;
    const scaledHp = hp / +wave;
    const seedHp = seed.hp;
    const prayed = Math.round((scaledHp / seedHp - 1) * 100);
    const validPrayed = prayed > 0 ? prayed : 0;
    ctx.updatePrayed(`${validPrayed.toLocaleString()}%@${modified}`);
  }, [seed, hp, ctx, modified, wave]);

  return (
    <Card className={classes.card}>
      <CardContent>
        {name}: {ctx.prayed}
        {seedList ? (
          <Autocomplete
            options={seedList}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.name === value.name}
            filterOptions={filterOptions}
            autoSelect={true}
            onChange={handleSeedChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="シード名"
                variant="outlined"
                margin="dense"
              />
            )}
          />
        ) : (
          <div>
            <p>シード情報を読み込み中</p>
          </div>
        )}
        <Grid container spacing={2}>
          <Grid item xs>
            <TextField
              label="シード体力"
              onChange={handleHpChange}
              fullWidth={true}
              variant="outlined"
              margin="dense"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              variant="outlined"
              margin="dense"
              fullWidth
              label="Wave"
              value={wave}
              onChange={handleWaveChange}
            >
              {waves.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Guild;
