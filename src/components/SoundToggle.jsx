import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SoundToggle({ soundOn, onToggle }) {
  const { t } = useTranslation();
  return (
    <button className="sound-toggle" onClick={onToggle}>
      {soundOn ? t('sound.on') : t('sound.off')}
    </button>
  );
}
