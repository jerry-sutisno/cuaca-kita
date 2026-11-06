import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-6 mt-12 border-t border-white/60 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-sm text-slate-500 dark:text-slate-400">
        <span>Data cuaca oleh</span>
        <a
          href="https://open-meteo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:text-primary-hover transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
        >
          Open-Meteo.com
        </a>
      </div>
    </footer>
  );
};
