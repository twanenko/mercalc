import React, { useState, useEffect, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { yellow, red, blue, green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { myGuildContext } from '../contexts/is-my-guild';

const RadioY = withStyles({
  root: { color: yellow[400], '&$checked': { color: yellow[600] } },
  checked: {},
})((props: RadioProps) => <Radio {...props} />);

const RadioR = withStyles({
  root: { color: red[400], '&$checked': { color: red[600] } },
  checked: {},
})((props: RadioProps) => <Radio {...props} />);

const RadioB = withStyles({
  root: { color: blue[400], '&$checked': { color: blue[600] } },
  checked: {},
})((props: RadioProps) => <Radio {...props} />);

const RadioG = withStyles({
  root: { color: green[400], '&$checked': { color: green[600] } },
  checked: {},
})((props: RadioProps) => <Radio {...props} />);

const MyGuild = () => {
  const ctx = useContext(myGuildContext);
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    ctx.updateMyGuild(value);
  };
  useEffect(() => {
    ctx.updateMyGuild(value);
  }, [ctx, value]);

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
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="yellow"
            control={<RadioY />}
            label="左上(黄)"
          />
          <FormControlLabel value="red" control={<RadioR />} label="右上(赤)" />
          <FormControlLabel
            value="blue"
            control={<RadioB />}
            label="左下(青)"
          />
          <FormControlLabel
            value="green"
            control={<RadioG />}
            label="右下(緑)"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default MyGuild;
