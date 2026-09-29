import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Finale({ onNext }) {
  const { t } = useTranslation();
  return (
    <section className="chapter finale-chapter">
      <h1 className="finale-title">{t('finale.happy')}</h1>
      <p className="finale-date">{t('finale.date')}</p>
      <p className="finale-thanks">{t('finale.thanks')}</p>
      <button className="text-action" onClick={onNext}>
        →
      </button>
    </section>
  );
}
