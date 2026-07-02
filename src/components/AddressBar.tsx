import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

interface Props {
  url: string;
  isLoading: boolean;
  onNavigate: (url: string) => void;
  onRefresh: () => void;
  onStop: () => void;
}

export const AddressBar: React.FC<Props> = ({ url, isLoading, onNavigate, onRefresh, onStop }) => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const displayUrl = focused ? text : (url || '');

  const handleSubmit = () => {
    const val = text.trim();
    if (!val) return;
    inputRef.current?.blur();
    onNavigate(val);
  };

  const handleFocus = () => {
    setText(url || '');
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setText('');
  };

  const handleRefreshPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    if (isLoading) onStop();
    else onRefresh();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.bar, focused && styles.barFocused]}>
        <View style={styles.lockIcon}>
          <Text style={styles.lockText}>
            {url.startsWith('https://') ? '🔒' : '⚠️'}
          </Text>
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={displayUrl}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="جستجو یا وارد کردن آدرس..."
          placeholderTextColor="#8e8e93"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="web-search"
          returnKeyType="go"
        />
      </View>
      <TouchableOpacity
        onPress={handleRefreshPress}
        style={styles.refreshBtn}
        activeOpacity={0.6}
      >
        <Animated.Text style={[styles.refreshIcon, { transform: [{ scale: scaleAnim }] }]}>
          {isLoading ? '✕' : '↻'}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#f5f5f7',
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  barFocused: {
    borderColor: '#0071e3',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  lockIcon: {
    marginRight: 6,
  },
  lockText: {
    fontSize: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1d1d1f',
    padding: 0,
    direction: 'ltr',
    textAlign: 'left',
  },
  refreshBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  refreshIcon: {
    fontSize: 20,
    color: '#0071e3',
    fontWeight: '600',
  },
});
