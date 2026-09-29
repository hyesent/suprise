import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const KEYS = ['health', 'people', 'experiences', 'peace', 'smile', 'days'];

export default function Wishes({ onNext }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= KEYS.length) return;
    const timer = setTimeout(() => setVisible((v) => v + 1), 1400);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <section className="chapter wishes-chapter">
      <h2 className="section-title">{t('wishes.title')}</h2>
      <ul className="wishes-list">
        {KEYS.slice(0, visible).map((k) => (
          <li key={k} className="wish-line">
            {t(`wishes.${k}`)}
          </li>
        ))}
      </ul>
      {visible >= KEYS.length && (
        <button className="primary-button" onClick={onNext}>
          CONTINUE →
        </button>
      )}
    </section>
  );
}
