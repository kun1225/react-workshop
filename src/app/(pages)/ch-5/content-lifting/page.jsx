'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Page() {
  return (
    <FloatingBarControl>
      <HeavyDashboard />
      <HeavyChart />
      <HeavyTable />
    </FloatingBarControl>
  );
}

function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // This is a synchronous block to simulate a slow component.
  }
}

function HeavyDashboard() {
  console.log(
    'Rendering HeavyDashboard... (This should only happen once)',
  );
  sleep(150);
  return (
    <section
      id="dashboard"
      className="h-screen bg-emerald-100 p-8"
    >
      <h1 className="text-2xl font-bold">
        Dashboard Section
      </h1>
      <p>This is a heavy component.</p>
    </section>
  );
}

function HeavyChart() {
  console.log(
    'Rendering HeavyChart... (This should only happen once)',
  );
  sleep(150);
  return (
    <section
      id="charts"
      className="h-screen bg-sky-100 p-8"
    >
      <h1 className="text-2xl font-bold">Charts Section</h1>
      <p>This is another heavy component.</p>
    </section>
  );
}

function HeavyTable() {
  console.log(
    'Rendering HeavyTable... (This should only happen once)',
  );
  sleep(150);
  return (
    <section
      id="tables"
      className="h-screen bg-rose-100 p-8"
    >
      <h1 className="text-2xl font-bold">Table Section</h1>
      <p>This is the last heavy component.</p>
    </section>
  );
}

function FloatingBarControl({ children }) {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [isBarVisible, setIsBarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const showBarPosition = 200;
      setIsBarVisible(window.scrollY > showBarPosition);

      const sections =
        containerRef.current.querySelectorAll('section');
      let currentSectionId = '';

      sections.forEach((section) => {
        const sectionTop =
          section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2) {
          currentSectionId = section.id;
        }
      });

      if (activeSection !== currentSectionId) {
        setActiveSection(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <div ref={containerRef}>
      {children}
      <FloatingBar
        isVisible={isBarVisible}
        currentSection={activeSection}
      />
    </div>
  );
}

function FloatingBar({ isVisible, currentSection }) {
  console.log(
    `FloatingBar re-rendering. Section: ${currentSection}`,
  );
  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-900 px-6 py-3 text-sm text-white shadow-lg transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-24',
      )}
    >
      <p className="capitalize">
        Active Section:{' '}
        <span className="font-bold">
          {currentSection || 'None'}
        </span>
      </p>
    </div>
  );
}
