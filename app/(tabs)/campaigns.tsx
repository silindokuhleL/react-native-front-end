import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View } from 'react-native';

export default function CampaignsScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ThemedText>Marketing Campaigns</ThemedText>
    </View>
  );
}