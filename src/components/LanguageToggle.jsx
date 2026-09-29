import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.startsWith('da') ? 'da' : 'en';

  const switchTo = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="lang-toggle">
      <button
        className={current === 'en' ? 'active' : ''}
        onClick={() => switchTo('en')}
      >
        {t('lang.en')}
      </button>
      <span className="lang-sep">/</span>
      <button
        className={current === 'da' ? 'active' : ''}
        onClick={() => switchTo('da')}
      >
        {t('lang.da')}
      </button>
    </div>
  );
}
