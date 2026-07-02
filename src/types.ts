export interface Tab {
  id: string;
  url: string;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
  favicon: string | null;
}

export interface HistoryItem {
  url: string;
  title: string;
  timestamp: number;
}

export interface Bookmark {
  url: string;
  title: string;
  favicon: string | null;
}
