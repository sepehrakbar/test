import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Tab } from '../types';

interface Props {
  tabs: Tab[];
  activeTabId: string;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
}

export const TabBar: React.FC<Props> = ({
  tabs,
  activeTabId,
  onSwitchTab,
  onCloseTab,
  onNewTab,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              tab.id === activeTabId && styles.activeTab,
            ]}
            onPress={() => onSwitchTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.tabFavicon}>
              {tab.isLoading ? '⏳' : tab.favicon || '🌐'}
            </Text>
            <Text
              style={[
                styles.tabTitle,
                tab.id === activeTabId && styles.activeTabTitle,
              ]}
              numberOfLines={1}
            >
              {tab.title || 'تب جدید'}
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => onCloseTab(tab.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.newTabBtn} onPress={onNewTab}>
        <Text style={styles.newTabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8ed',
    paddingVertical: 4,
    paddingLeft: 4,
    maxHeight: 44,
  },
  scroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: 10,
    marginRight: 2,
    backgroundColor: '#dcdce0',
    borderRadius: 8,
    maxWidth: 160,
    minWidth: 80,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabFavicon: {
    fontSize: 12,
    marginRight: 4,
  },
  tabTitle: {
    fontSize: 12,
    color: '#6e6e73',
    flex: 1,
    textAlign: 'left',
  },
  activeTabTitle: {
    color: '#1d1d1f',
    fontWeight: '600',
  },
  closeBtn: {
    width: 18,
    height: 18,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  closeIcon: {
    fontSize: 10,
    color: '#8e8e93',
    fontWeight: '700',
  },
  newTabBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: '#dcdce0',
  },
  newTabIcon: {
    fontSize: 20,
    color: '#6e6e73',
    fontWeight: '500',
    lineHeight: 22,
  },
});
