import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { Seed, updatePrayed } from '../modules/prayerModule';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../rootReducer';

/**
 * waveの選択肢
 * @param value 倍率
 */
const waves = [
  { value: '1', label: '1体目' },
  { value: '1.2', label: '2体目' },
  { value: '1.4', label: '3体目' },
  { value: '1.6', label: '4体目' },
  { value: '1.8', label: '5体目' },
];

interface GuildStyle {
  backgroundColor: string;
  color: string;
}

export interface GuildProps {
  name: string;
  guildStyle: GuildStyle;
}

const Guild = ({ name, guildStyle }: GuildProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      card: {
        backgroundColor: guildStyle.backgroundColor,
        color: guildStyle.color,
        padding: theme.spacing(2),
      },
    })
  );
  /** cssの設定 */
  const classes = useStyles();

  /** state */
  const seedList = useSelector((state: RootState) => state.prayer.seeds);
  const myGuild = useSelector((state: RootState) =>
    state.prayer.guild.find((g) => g.name === name)
  );
  const dispatch = useDispatch();

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

  /** 選択されたシード */
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  /** 入力された体力 */
  const [hp, setHp] = useState(0);
  /** シードのwave数 */
  const [scale, setScale] = useState(1);

  /** シード選択 */
  const handleSeedChange = (e: React.ChangeEvent<{}>, value: Seed | null) => {
    setSelectedSeed(value);
  };
  /** 体力入力 */
  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHp(+e.target.value);
  };
  /** wave選択 */
  const handleWaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(+e.target.value);
  };

  useEffect(() => {
    dispatch(updatePrayed({ name, seed: selectedSeed, hp, scale }));
  }, [dispatch, hp, name, scale, selectedSeed]);

  return (
    <Card className={classes.card}>
      <CardContent>
        {myGuild?.title}: {myGuild?.prayed.toLocaleString()}%{myGuild?.modified}
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
              value={scale.toLocaleString()}
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
