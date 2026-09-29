import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

export default function WishForm({ onNext }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus('sending');

    let photoUrl = null;
    if (file) {
      const path = `${Date.now()}-${file.name}`;
      const { error: uploadErr } = await supabase.storage
        .from('wish-photos')
        .upload(path, file);
      if (!uploadErr) {
        const { data } = supabase.storage.from('wish-photos').getPublicUrl(path);
        photoUrl = data.publicUrl;
      }
    }

    const { error } = await supabase.from('wishes').insert({
      name: name.trim(),
      message: message.trim(),
      photo_url: photoUrl,
      status: 'pending',
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('done');
    }
  };

  if (status === 'done') {
    return (
      <section className="chapter wishform-chapter">
        <p className="editorial-line">{t('wishForm.thanks')}</p>
        <p className="subtitle">{t('wishForm.pending')}</p>
        <button className="primary-button" onClick={onNext}>
          {t('wishWall.title', 'SEE THE WALL')} →
        </button>
      </section>
    );
  }

  return (
    <section className="chapter wishform-chapter">
      <h2 className="section-title">{t('wishForm.title')}</h2>
      <form className="wish-form" onSubmit={submit}>
        <label>
          <span>{t('wishForm.name')}</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>{t('wishForm.message')}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
          />
        </label>
        <label className="file-label">
          <span>{t('wishForm.photo')}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        <button className="primary-button" type="submit" disabled={status === 'sending'}>
          {t('wishForm.submit')} →
        </button>
      </form>
    </section>
  );
}
