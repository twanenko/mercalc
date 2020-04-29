import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { Seed } from '../App';
import { guildContext } from '../contexts/guild';

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
   * 祈り値等を入れるcontext
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
   * 祈りprayed
   */
  useEffect(() => {
    if (!seed) return;
    if (!hp) return;
    const seedHp = seed.hp;
    const prayed = Math.round((hp / seedHp - 1) * 100);
    if (prayed < 0) ctx.updatePrayed(`0%(${modified})`);
    else ctx.updatePrayed(`${prayed.toLocaleString()}%(${modified})`);
  }, [seed, hp, ctx, modified]);

  return (
    <div>
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
          <TextField
            label="モンスターの体力"
            onChange={handleHpChange}
            fullWidth={true}
            variant="outlined"
            margin="dense"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Guild;
