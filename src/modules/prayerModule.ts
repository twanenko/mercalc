import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Seed {
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
}

export const fetchSeedList = createAsyncThunk(
  'prayer/fetchSeed',
  async (url: string) => {
    const response = await fetch(url);
    return (await response.json()) as Seed[];
  }
);

interface GuildState {
  name: string;
  title: string;
  prayed: number;
  modified: string;
}

interface PrayerState {
  seeds: Seed[] | null;
  seedStatus: string;
  timer: string;
  myGuildName: string;
  guild: GuildState[];
}

const initialState: PrayerState = {
  seeds: null,
  seedStatus: 'シード情報を読み込み中',
  timer: '',
  myGuildName: '',
  guild: [
    { name: 'yellow', title: '左上(黄)', prayed: 0, modified: '' },
    { name: 'red', title: '右上(赤)', prayed: 0, modified: '' },
    { name: 'gate', title: 'ゲート(門)', prayed: 0, modified: '' },
    { name: 'blue', title: '左下(青)', prayed: 0, modified: '' },
    { name: 'green', title: '右下(緑)', prayed: 0, modified: '' },
  ],
};

export interface Prayed {
  name: string;
  seed: Seed | null;
  hp: number;
  scale: number;
}

export const prayerSlice = createSlice({
  name: 'prayer',
  initialState,
  reducers: {
    getTimer: (state, action: PayloadAction<string>) => {
      state.timer = action.payload;
    },
    getMyGuildName: (state, action: PayloadAction<string>) => {
      state.myGuildName = action.payload;
    },
    updatePrayed: (state, action: PayloadAction<Prayed>) => {
      const { name, seed, hp, scale } = action.payload;
      if (!seed) return;
      const guild = state.guild.find((g) => g.name === name);
      if (!guild) return;
      const scaledHp = hp / scale;
      const defaultHp = seed.hp;
      const prayed = Math.round((scaledHp / defaultHp - 1) * 100);
      const validPrayed = prayed > 0 ? prayed : 0;
      guild.prayed = validPrayed;
      guild.modified = `@${state.timer}`;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeedList.fulfilled, (state, action) => {
      state.seeds = action.payload;
    });
    builder.addCase(fetchSeedList.rejected, (state, action) => {
      state.seedStatus = 'シード読み込みに失敗しました';
    });
  },
});

export const { getTimer, getMyGuildName, updatePrayed } = prayerSlice.actions;

export default prayerSlice;
