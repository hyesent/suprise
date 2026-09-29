import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { photos } from '../data/photos';

export default function PhotoJourney({ onNext }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (dir) => {
    clearInterval(timerRef.current);
    setIndex((i) => (i + dir + photos.length) % photos.length);
  };

  const p = photos[index];

  return (
    <section className="chapter photos-chapter">
      <div className="photo-counter">
        {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
      </div>
      <div className="photo-frame">
        <img src={p.src} alt={p.caption} className="photo-img" />
      </div>
      <p className="photo-caption">{p.caption || t('photos.moment')}</p>
      <div className="photo-controls">
        <button onClick={() => go(-1)} aria-label="Previous">←</button>
        <button onClick={() => go(1)} aria-label="Next">→</button>
      </div>
      <button className="primary-button" onClick={onNext}>
        CONTINUE →
      </button>
    </section>
  );
}
