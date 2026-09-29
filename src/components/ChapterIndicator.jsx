import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ChapterIndicator({ current, total }) {
  const { t } = useTranslation();
  return (
    <div className="chapter-indicator">
      {String(current + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
    </div>
  );
}
