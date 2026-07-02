import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewErrorEvent, WebViewNavigationEvent } from 'react-native-webview/lib/RNCWebViewNativeComponent';
import { Tab } from './types';
import { generateId, normalizeUrl, DEFAULT_SEARCH } from './utils';
import { AddressBar } from './components/AddressBar';
import { TabBar } from './components/TabBar';
import { NavBar } from './components/NavBar';
import { NewTabPage } from './components/NewTabPage';

export const Browser: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: generateId(), url: '', title: 'تب جدید', canGoBack: false, canGoForward: false, isLoading: false, favicon: null },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const webViewRefs = useRef<Map<string, WebView>>(new Map());

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const handleNavigate = useCallback((urlOrQuery: string) => {
    const finalUrl = normalizeUrl(urlOrQuery) || DEFAULT_SEARCH;
    updateTab(activeTabId, { url: finalUrl, isLoading: true });
  }, [activeTabId, updateTab]);

  const switchTab = useCallback((id: string) => {
    setActiveTabId(id);
  }, []);

  const closeTab = useCallback((id: string) => {
    if (tabs.length <= 1) return;
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      const filtered = prev.filter((t) => t.id !== id);
      if (activeTabId === id) {
        const newIdx = Math.min(idx, filtered.length - 1);
        setActiveTabId(filtered[newIdx].id);
      }
      return filtered;
    });
  }, [tabs.length, activeTabId]);

  const newTab = useCallback(() => {
    const tab: Tab = {
      id: generateId(),
      url: '',
      title: 'تب جدید',
      canGoBack: false,
      canGoForward: false,
      isLoading: false,
      favicon: null,
    };
    setTabs((prev) => [...prev, tab]);
    setActiveTabId(tab.id);
  }, []);

  const handleRefresh = useCallback(() => {
    const wv = webViewRefs.current.get(activeTabId);
    if (wv) wv.reload();
  }, [activeTabId]);

  const handleStop = useCallback(() => {
    const wv = webViewRefs.current.get(activeTabId);
    if (wv) wv.stopLoading();
    updateTab(activeTabId, { isLoading: false });
  }, [activeTabId, updateTab]);

  const handleGoBack = useCallback(() => {
    const wv = webViewRefs.current.get(activeTabId);
    if (wv) wv.goBack();
  }, [activeTabId]);

  const handleGoForward = useCallback(() => {
    const wv = webViewRefs.current.get(activeTabId);
    if (wv) wv.goForward();
  }, [activeTabId]);

  const handleHome = useCallback(() => {
    handleNavigate(DEFAULT_SEARCH);
  }, [handleNavigate]);

  const handleBookmark = useCallback(() => {
    if (activeTab.url) {
      updateTab(activeTabId, { title: activeTab.title + ' ★' });
    }
  }, [activeTabId, activeTab.url, activeTab.title, updateTab]);

  const handleWebViewRef = useCallback((id: string, ref: WebView | null) => {
    if (ref) {
      webViewRefs.current.set(id, ref);
    } else {
      webViewRefs.current.delete(id);
    }
  }, []);

  const handleLoadStart = useCallback((e: WebViewNavigationEvent) => {
    updateTab(activeTabId, { isLoading: true });
  }, [activeTabId, updateTab]);

  const handleLoadEnd = useCallback((e: WebViewNavigationEvent) => {
    updateTab(activeTabId, { isLoading: false });
  }, [activeTabId, updateTab]);

  const handleNavigationStateChange = useCallback((navState: any) => {
    updateTab(activeTabId, {
      url: navState.url,
      title: navState.title || activeTab.title,
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      isLoading: navState.loading,
    });
  }, [activeTabId, activeTab.title, updateTab]);

  const renderWebView = (tab: Tab) => {
    if (!tab.url) return null;

    return (
      <WebView
        key={tab.id}
        ref={(ref) => handleWebViewRef(tab.id, ref)}
        source={{ uri: tab.url }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        setSupportMultipleWindows={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
        applicationNameForUserAgent="SoheilBrowser/1.0"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f7" />

      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSwitchTab={switchTab}
        onCloseTab={closeTab}
        onNewTab={newTab}
      />

      <AddressBar
        url={activeTab.url}
        isLoading={activeTab.isLoading}
        onNavigate={handleNavigate}
        onRefresh={handleRefresh}
        onStop={handleStop}
      />

      <View style={styles.webviewContainer}>
        {activeTab.url ? (
          renderWebView(activeTab)
        ) : (
          <NewTabPage onNavigate={handleNavigate} />
        )}
      </View>

      <NavBar
        canGoBack={activeTab.canGoBack}
        canGoForward={activeTab.canGoForward}
        tabCount={tabs.length}
        onBack={handleGoBack}
        onForward={handleGoForward}
        onHome={handleHome}
        onNewTab={newTab}
        onBookmark={handleBookmark}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
});
