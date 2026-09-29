import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TARGET = new Date('2026-09-30T00:00:00');

function getCopenhagenTime() {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Europe/Copenhagen' })
  );
}

export default function Countdown({ onLeaveWish }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = getCopenhagenTime();
    const diff = TARGET - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      done: false,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="chapter countdown-chapter">
      <div className="chapter-label">01 — 08</div>
      <h1 className="display-name">MARTIN MOURITZEN</h1>
      <p className="display-date">30 SEPTEMBER 2026</p>
      <div className="countdown-grid">
        {[
          { v: timeLeft.days, l: t('countdown.days') },
          { v: timeLeft.hours, l: t('countdown.hours') },
          { v: timeLeft.minutes, l: t('countdown.minutes') },
          { v: timeLeft.seconds, l: t('countdown.seconds') },
        ].map(({ v, l }) => (
          <div className="countdown-cell" key={l}>
            <span className="countdown-value">{String(v).padStart(2, '0')}</span>
            <span className="countdown-label">{l}</span>
          </div>
        ))}
      </div>
      <p className="subtitle">{t('countdown.subtitle')}</p>
      <button className="text-action" onClick={onLeaveWish}>
        {t('countdown.leaveWish')} →
      </button>
    </section>
  );
}
