import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View } from 'react-native';

export default function BookScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText>Book Appointment</ThemedText>
    </View>
  );
}