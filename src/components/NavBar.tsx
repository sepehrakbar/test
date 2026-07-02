import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  canGoBack: boolean;
  canGoForward: boolean;
  tabCount: number;
  onBack: () => void;
  onForward: () => void;
  onHome: () => void;
  onNewTab: () => void;
  onBookmark: () => void;
}

export const NavBar: React.FC<Props> = ({
  canGoBack,
  canGoForward,
  tabCount,
  onBack,
  onForward,
  onHome,
  onNewTab,
  onBookmark,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, !canGoBack && styles.btnDisabled]}
        onPress={canGoBack ? onBack : undefined}
        disabled={!canGoBack}
      >
        <Text style={[styles.icon, !canGoBack && styles.iconDisabled]}>◀</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, !canGoForward && styles.btnDisabled]}
        onPress={canGoForward ? onForward : undefined}
        disabled={!canGoForward}
      >
        <Text style={[styles.icon, !canGoForward && styles.iconDisabled]}>▶</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onHome}>
        <Text style={styles.icon}>🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onBookmark}>
        <Text style={styles.icon}>🔖</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabBtn} onPress={onNewTab}>
        <Text style={styles.tabBtnIcon}>□</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{tabCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f5f5f7',
    borderTopWidth: 1,
    borderTopColor: '#e5e5ea',
    paddingVertical: 4,
    paddingBottom: 8,
  },
  btn: {
    width: 48,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.3,
  },
  icon: {
    fontSize: 20,
    color: '#0071e3',
  },
  iconDisabled: {
    color: '#c7c7cc',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 40,
    borderRadius: 10,
  },
  tabBtnIcon: {
    fontSize: 20,
    color: '#0071e3',
  },
  badge: {
    backgroundColor: '#0071e3',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginLeft: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
});
