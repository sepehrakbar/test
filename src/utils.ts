export function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const hasScheme = /^https?:\/\//i.test(trimmed);
  const isDomain = /^[\w.-]+\.[a-z]{2,}/i.test(trimmed);

  if (hasScheme) return trimmed;
  if (isDomain) return 'https://' + trimmed;
  if (trimmed.includes(' ') || !trimmed.includes('.')) {
    return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
  }
  return 'https://' + trimmed;
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

export const DEFAULT_SEARCH = 'https://www.google.com';

export const SHORTCUTS = [
  { name: 'Google', url: 'https://www.google.com', color: '#4285f4', initial: 'G' },
  { name: 'YouTube', url: 'https://www.youtube.com', color: '#ff0000', initial: 'Y' },
  { name: 'GitHub', url: 'https://github.com', color: '#24292e', initial: 'G' },
  { name: 'ویکی‌پدیا', url: 'https://fa.wikipedia.org', color: '#636363', initial: 'و' },
  { name: 'Instagram', url: 'https://www.instagram.com', color: '#e4405f', initial: 'I' },
  { name: 'X', url: 'https://x.com', color: '#000000', initial: 'X' },
  { name: 'Reddit', url: 'https://www.reddit.com', color: '#ff4500', initial: 'R' },
  { name: 'StackOverflow', url: 'https://stackoverflow.com', color: '#f48024', initial: 'S' },
];
