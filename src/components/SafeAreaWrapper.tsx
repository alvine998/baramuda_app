import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: any;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
