import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PersonalMessage({ onNext }) {
  const { t } = useTranslation();
  return (
    <section className="chapter message-chapter">
      <h1 className="birthday-title small">{t('birthday.happy')}</h1>
      <p className="personal-message">{t('message.text')}</p>
      <button className="primary-button" onClick={onNext}>
        CONTINUE →
      </button>
    </section>
  );
}
