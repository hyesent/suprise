import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Invitation({ onNext }) {
  const { t } = useTranslation();
  return (
    <section className="chapter invitation-chapter">
      <p className="editorial-line">{t('invitation.before')}</p>
      <p className="editorial-line secondary">{t('invitation.thinking')}</p>
      <button className="primary-button" onClick={onNext}>
        {t('invitation.button')}
      </button>
    </section>
  );
}
