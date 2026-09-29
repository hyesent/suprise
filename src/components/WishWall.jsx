import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

export default function WishWall({ onNext }) {
  const { t } = useTranslation();
  const [wishes, setWishes] = useState([]);

  const fetchApproved = async () => {
    const { data } = await supabase
      .from('wishes')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: true });
    if (data) setWishes(data);
  };

  useEffect(() => {
    fetchApproved();
    const channel = supabase
      .channel('public:wishes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'wishes', filter: 'status=eq.approved' },
        () => fetchApproved()
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <section className="chapter wishwall-chapter">
      <p className="wall-count">
        {t('wishWall.count', { count: wishes.length })}
      </p>
      <div className="wish-wall">
        {wishes.length === 0 && (
          <p className="empty-wall">{t('wishWall.empty')}</p>
        )}
        {wishes.map((w) => (
          <article className="wish-card" key={w.id}>
            <span className="wish-author">{w.name}</span>
            <p className="wish-message">{w.message}</p>
            {w.photo_url && (
              <img src={w.photo_url} alt="" className="wish-photo" loading="lazy" />
            )}
          </article>
        ))}
      </div>
      <button className="primary-button" onClick={onNext}>
        CONTINUE →
      </button>
    </section>
  );
}
