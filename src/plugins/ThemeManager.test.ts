import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemePlugin, ThemeType } from '@/types/theme-plugins';
import { useThemeManager } from './ThemeManager';
import DefaultTheme from './themes/DefaultTheme';

describe('useThemeManager', () => {
  it('ships every built-in theme', () => {
    const { result } = renderHook(() => useThemeManager());

    expect(result.current.availableThemes.map((theme) => theme.id)).toEqual([
      'default',
      'excel',
      'code',
      'mail',
      'terminal',
    ]);
  });

  it('returns the theme that matches the id', () => {
    const { result } = renderHook(() => useThemeManager());

    expect(result.current.getTheme('excel').id).toBe('excel');
  });

  it('falls back to the default theme for an unknown id', () => {
    const { result } = renderHook(() => useThemeManager());

    expect(result.current.getTheme('slack' as ThemeType)).toBe(DefaultTheme);
  });

  it('replaces a registered theme that reuses an existing id', () => {
    const { result } = renderHook(() => useThemeManager());
    const customExcel: ThemePlugin = { ...DefaultTheme, id: 'excel', name: 'Custom Excel' };

    act(() => result.current.registerTheme(customExcel));

    expect(result.current.availableThemes).toHaveLength(5);
    expect(result.current.getTheme('excel').name).toBe('Custom Excel');
  });
});
