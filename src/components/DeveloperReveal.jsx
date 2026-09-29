import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DeveloperReveal({ onNext, full = false, onBack }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(full);

  if (!expanded) {
    return (
      <section className="chapter ps-chapter">
        <p className="ps-label">{t('ps.ps')}</p>
        <p className="ps-line">{t('ps.wondering')}</p>
        <p className="ps-name">{t('ps.name')}</p>
        <p className="ps-tagline">{t('ps.tagline')}</p>
        <button className="primary-button" onClick={() => setExpanded(true)}>
          {t('ps.cta')} →
        </button>
      </section>
    );
  }

  const projects = ['zephye', 'hyezen', 'discypln', 'hyeScriptures', 'hyeSpace'];

  return (
    <section className="chapter dev-chapter">
      <h2 className="section-title">{t('ps.projectsTitle')}</h2>
      <div className="projects-grid">
        {projects.map((key) => {
          const p = t(`ps.projects.${key}`, { returnObjects: true });
          return (
            <a
              key={key}
              className="project-card"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="project-name">{p.name}</span>
              <p className="project-desc">{p.desc}</p>
              <span className="project-arrow">→</span>
            </a>
          );
        })}
      </div>
      <button className="text-action" onClick={onBack || onNext}>
        ← {t('ps.back')}
      </button>
    </section>
  );
}
