import {I18n} from 'i18n-js';

import en from '../locales/en.json';
import ar from '../locales/ar.json';

const i18n = new I18n({
    en,
    ar,
  });

i18n.locale = 'ar';

export default i18n;
