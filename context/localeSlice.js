import { createSlice } from '@reduxjs/toolkit';
import I18n from '../app/i18n';

const localeSlice = createSlice({
  name: 'locale',
  initialState: I18n.locale,
  reducers: {
    setLocale: (state, action) => {
      const locale = action.payload;
      I18n.locale = locale;

      return locale;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
