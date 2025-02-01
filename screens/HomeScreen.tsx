import React from 'react';
import { View } from 'react-native';
import { MenuItems } from '../components/MenuItems';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MenuItems />
    </View>
  );
}