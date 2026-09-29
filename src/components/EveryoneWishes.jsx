import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

export default function EveryoneWishes({ onNext }) {
  const { t } = useTranslation();
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    supabase
      .from('wishes')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: true })
      .then(({ data }) => data && setWishes(data));
  }, []);

  return (
    <section className="chapter everyone-chapter">
      <h2 className="section-title">{t('everyone.title')}</h2>
      <p className="wall-count">{t('everyone.count', { count: wishes.length })}</p>
      <div className="everyone-flow">
        {wishes.map((w) => (
          <article className="everyone-card" key={w.id}>
            <span className="wish-author">{w.name}</span>
            <p className="wish-message">{w.message}</p>
          </article>
        ))}
      </div>
      <button className="primary-button" onClick={onNext}>
        CONTINUE →
      </button>
    </section>
  );
}
