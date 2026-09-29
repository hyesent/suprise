import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Howl, Howler } from 'howler';

import Countdown from './components/Countdown';
import Invitation from './components/Invitation';
import WishForm from './components/WishForm';
import WishWall from './components/WishWall';
import Discoveries from './components/Discoveries';
import PhotoJourney from './components/PhotoJourney';
import Wishes from './components/Wishes';
import BirthdayReveal from './components/BirthdayReveal';
import EveryoneWishes from './components/EveryoneWishes';
import PersonalMessage from './components/PersonalMessage';
import Finale from './components/Finale';
import DeveloperReveal from './components/DeveloperReveal';
import LanguageToggle from './components/LanguageToggle';
import SoundToggle from './components/SoundToggle';
import ChapterIndicator from './components/ChapterIndicator';

const CHAPTERS = [
  'countdown',
  'invitation',
  'wishform',
  'wishwall',
  'discoveries',
  'photos',
  'wishes',
  'birthday',
  'everyone',
  'message',
  'finale',
  'ps',
  'dev',
];

export default function App() {
  const { t } = useTranslation();
  const [chapter, setChapter] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const ambientRef = useRef(null);
  const transitionRef = useRef(null);

  // Preload sounds
  useEffect(() => {
    ambientRef.current = new Howl({
      src: ['/sounds/ambient.mp3'],
      loop: true,
      volume: 0.25,
      html5: true,
    });
    transitionRef.current = new Howl({
      src: ['/sounds/transition.mp3'],
      volume: 0.4,
      html5: true,
    });
    return () => {
      ambientRef.current?.unload();
      transitionRef.current?.unload();
    };
  }, []);

  const unlockAudio = () => {
    if (unlocked) return;
    Howler.ctx.resume().then(() => {
      setUnlocked(true);
      if (soundOn) ambientRef.current?.play();
    });
  };

  const toggleSound = () => {
    if (!unlocked) unlockAudio();
    if (soundOn) {
      ambientRef.current?.fade(ambientRef.current.volume(), 0, 600);
      setTimeout(() => ambientRef.current?.pause(), 650);
    } else {
      ambientRef.current?.play();
      ambientRef.current?.fade(0, 0.25, 800);
    }
    setSoundOn(!soundOn);
  };

  const goToChapter = (index) => {
    if (index < 0 || index >= CHAPTERS.length) return;
    transitionRef.current?.play();
    setChapter(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-advance countdown → birthday at midnight Copenhagen
  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      const copenhagen = new Date(
        now.toLocaleString('en-US', { timeZone: 'Europe/Copenhagen' })
      );
      const target = new Date('2026-09-30T00:00:00');
      if (copenhagen >= target && chapter < 7) {
        goToChapter(7);
      }
    };
    const interval = setInterval(checkMidnight, 1000);
    return () => clearInterval(interval);
  }, [chapter]);

  return (
    <div className="app" onPointerDown={unlockAudio}>
      <div className="top-bar">
        <ChapterIndicator current={chapter} total={CHAPTERS.length} />
        <div className="top-controls">
          <LanguageToggle />
          <SoundToggle soundOn={soundOn} onToggle={toggleSound} />
        </div>
      </div>

      <main className="experience">
        {chapter === 0 && <Countdown onLeaveWish={() => goToChapter(2)} />}
        {chapter === 1 && <Invitation onNext={() => goToChapter(2)} />}
        {chapter === 2 && <WishForm onNext={() => goToChapter(3)} />}
        {chapter === 3 && <WishWall onNext={() => goToChapter(4)} />}
        {chapter === 4 && <Discoveries onNext={() => goToChapter(5)} />}
        {chapter === 5 && <PhotoJourney onNext={() => goToChapter(6)} />}
        {chapter === 6 && <Wishes onNext={() => goToChapter(7)} />}
        {chapter === 7 && <BirthdayReveal onNext={() => goToChapter(8)} />}
        {chapter === 8 && <EveryoneWishes onNext={() => goToChapter(9)} />}
        {chapter === 9 && <PersonalMessage onNext={() => goToChapter(10)} />}
        {chapter === 10 && <Finale onNext={() => goToChapter(11)} />}
        {chapter === 11 && <DeveloperReveal onNext={() => goToChapter(12)} />}
        {chapter === 12 && <DeveloperReveal full onBack={() => goToChapter(11)} />}
      </main>

      <nav className="chapter-nav">
        <button
          className="nav-arrow"
          onClick={() => goToChapter(chapter - 1)}
          disabled={chapter === 0}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          className="nav-arrow"
          onClick={() => goToChapter(chapter + 1)}
          disabled={chapter === CHAPTERS.length - 1}
          aria-label="Next"
        >
          →
        </button>
      </nav>
    </div>
  );
}
