import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

/**
 * Keeps the `dark` class on the document root in sync with the theme store.
 */
export function useApplyTheme(): void {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);
}
