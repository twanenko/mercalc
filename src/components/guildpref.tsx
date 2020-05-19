import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { yellow, red, blue, green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { getMyGuildName } from '../modules/prayerModule';
import { useDispatch } from 'react-redux';

interface LabelRadioProps {
  title: string;
  name: string;
  color: {
    radio: string;
    checked: string;
  };
}

/** フォームラベルにradioをつっこむやつ */
const LabelRadio = ({ title, name, color }: LabelRadioProps) => {
  const StyledRadio = withStyles({
    root: { color: color.radio, '&$checked': { color: color.checked } },
    checked: {},
  })((props: RadioProps) => <Radio {...props} />);
  return (
    <FormControlLabel value={name} label={title} control={<StyledRadio />} />
  );
};

interface GuildStyles {
  [s: string]: LabelRadioProps;
}

const guildStyles: GuildStyles = {
  radioY: {
    title: '左上(黄)',
    name: 'yellow',
    color: { radio: yellow[400], checked: yellow[600] },
  },
  radioR: {
    title: '右上(赤)',
    name: 'red',
    color: { radio: red[400], checked: red[600] },
  },
  radioB: {
    title: '左下(青)',
    name: 'blue',
    color: { radio: blue[400], checked: blue[600] },
  },
  radioG: {
    title: '右下(緑)',
    name: 'green',
    color: { radio: green[400], checked: green[600] },
  },
};
/**
 * FormLabelのところに指定したかったが、onChange時にデフォルトの青色に
 * なってしまうのでstyleで直接指定している
 *
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: { color: 'white' },
  })
);
/*
*/

const GuildPref = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();

  /** 選ばれた値 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getMyGuildName(e.target.value));
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={{ color: 'white' }}>
          自分のギルド
        </FormLabel>
        <RadioGroup
          row={true}
          aria-label="my-guild"
          name="my-guild"
          onChange={handleChange}
        >
          <LabelRadio {...guildStyles.radioY} />
          <LabelRadio {...guildStyles.radioR} />
          <LabelRadio {...guildStyles.radioB} />
          <LabelRadio {...guildStyles.radioG} />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default GuildPref;
