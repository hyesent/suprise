import React from 'react';
import { useTranslation } from 'react-i18next';

export default function BirthdayReveal({ onNext }) {
  const { t } = useTranslation();
  return (
    <section className="chapter birthday-chapter">
      <h1 className="birthday-title">{t('birthday.happy')}</h1>
      <p className="birthday-date">{t('birthday.date')}</p>
      <p className="birthday-sub">{t('birthday.today')}</p>
      <button className="primary-button" onClick={onNext}>
        CONTINUE →
      </button>
    </section>
  );
}
