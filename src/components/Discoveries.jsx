import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CARDS = [
  { key: 'wish', textKey: 'wishesText.mum' },
  { key: 'message', textKey: 'wishesText.family' },
  { key: 'fromEveryone', textKey: null },
];

export default function Discoveries({ onNext }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  return (
    <section className="chapter discoveries-chapter">
      <h2 className="section-title">{t('discoveries.title')}</h2>
      <div className={`discovery-grid ${open ? 'has-open' : ''}`}>
        {CARDS.map((c) => (
          <button
            key={c.key}
            className={`discovery-card ${open === c.key ? 'open' : ''} ${
              open && open !== c.key ? 'receded' : ''
            }`}
            onClick={() => setOpen(open === c.key ? null : c.key)}
          >
            <span className="discovery-label">{t(`discoveries.${c.key}`)}</span>
            {open === c.key && (
              <div className="discovery-content">
                {c.textKey ? (
                  <p>{t(c.textKey)}</p>
                ) : (
                  <p>{t('everyone.title')}</p>
                )}
                <span className="close-hint">{t('discoveries.close')}</span>
              </div>
            )}
            {!open && <span className="tap-hint">{t('discoveries.tapHint')}</span>}
          </button>
        ))}
      </div>
      <button className="primary-button" onClick={onNext}>
        CONTINUE →
      </button>
    </section>
  );
}
