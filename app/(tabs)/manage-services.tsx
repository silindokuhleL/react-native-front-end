import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';

export default function ManageServicesScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText>Services</ThemedText>
    </View>
  );
}