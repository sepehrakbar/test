import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SHORTCUTS } from '../utils';

interface Props {
  onNavigate: (url: string) => void;
}

export const NewTabPage: React.FC<Props> = ({ onNavigate }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onNavigate(query.trim());
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f7" />

      <View style={styles.logoSection}>
        <Text style={styles.logo}>سهیل بین</Text>
        <Text style={styles.subtitle}>مرورگر مدرن و سریع</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            placeholder="جستجو کنید یا آدرس بزنید..."
            placeholderTextColor="#8e8e93"
            returnKeyType="go"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <Text style={styles.shortcutsTitle}>میانبرها</Text>

      <View style={styles.shortcutsGrid}>
        {SHORTCUTS.map((sc) => (
          <TouchableOpacity
            key={sc.url}
            style={styles.shortcut}
            onPress={() => onNavigate(sc.url)}
            activeOpacity={0.7}
          >
            <View style={[styles.shortcutIcon, { backgroundColor: sc.color }]}>
              <Text style={styles.shortcutInitial}>{sc.initial}</Text>
            </View>
            <Text style={styles.shortcutName} numberOfLines={1}>
              {sc.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f7',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 44,
    fontWeight: '800',
    color: '#0071e3',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: '#8e8e93',
    marginTop: 4,
  },
  searchContainer: {
    width: '100%',
    maxWidth: 500,
    marginBottom: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1d1d1f',
    padding: 0,
    textAlign: 'right',
  },
  shortcutsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8e93',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  shortcut: {
    alignItems: 'center',
    width: 80,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e5ea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  shortcutIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  shortcutInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  shortcutName: {
    fontSize: 11,
    color: '#6e6e73',
    textAlign: 'center',
  },
});
