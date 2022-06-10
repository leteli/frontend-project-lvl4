import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';

const NoMatch = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-4">
      <h3>{t('no_match_page.header')}</h3>
      <p><a href={routes.root}>{t('no_match_page.link')}</a></p>
    </div>
  );
};

export default NoMatch;
