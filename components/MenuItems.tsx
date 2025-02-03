import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { useCategories } from '@/hooks/useCategories';

export function MenuItems() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const { categories, loading, error, fetchCategories } = useCategories();
  const [menuData, setMenuData] = useState<any[]>([]);

  const defaultImage = require('../assets/images/haircut.jpg');

  useEffect(() => {
    const loadCategories = async () => {
      const result = await fetchCategories();
      if (result) {
        setMenuData(result);
        console.log('Categories from API:', result);
      }
    };

    loadCategories();
  }, []);

  const categoryIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    'Hair Services': 'cut-outline',
    'Nail Services': 'hand-left-outline',
    'Massage & Spa': 'body-outline',
    'Facial & Skin': 'water-outline'
  };

  const filterMenuItems = (items: any[], query: string) => {
    if (!query) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Error loading services</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ThemedView style={{ padding: 15 }}>
        <TextInput
          placeholder="Search services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#e0e0e0'
          }}
        />
      </ThemedView>
      
      {menuData.map((category) => {
        const filteredItems = filterMenuItems(category.services || [], searchQuery);
        
        if (filteredItems.length === 0) return null;

        return (
          <View key={category.id}>
            <ThemedView style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              padding: 15,
              paddingBottom: 10 
            }}>
              <Ionicons 
                name={categoryIcons[category.name] || 'list-outline'} 
                size={24} 
                color="#210883" 
              />
              <ThemedText style={{ 
                fontSize: 20, 
                fontWeight: 'bold',
                marginLeft: 10
              }}>
                {category.name}
              </ThemedText>
            </ThemedView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <ThemedView style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
                {filteredItems.map((item) => (
                  <ThemedView
                    key={item.id}
                    style={{
                      marginRight: 15,
                      padding: 12,
                      borderRadius: 10,
                      backgroundColor: '#f5f5f5',
                      width: 180,
                      height: 360,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <ThemedText style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 3 }}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={{ fontSize: 14, color: '#210883', fontWeight: 'bold' }}>
                      R{item.price}
                    </ThemedText>
                    <Image 
                      source={item.image_path ? { uri: item.image_path } : defaultImage}
                      style={{
                        width: 156,
                        height: 120,
                        borderRadius: 8,
                        marginVertical: 8,
                        alignSelf: 'center'
                      }}
                    />
                    <ThemedText style={{ fontSize: 12, opacity: 0.7, marginBottom: 3 }}>
                      {item.description}
                    </ThemedText>
                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <ThemedText style={{ fontSize: 12, marginLeft: 4 }}>
                        {item.rating} ({item.reviews})
                      </ThemedText>
                    </ThemedView>
                    <ThemedText style={{ fontSize: 11, opacity: 0.5, marginBottom: 2 }}>
                      {item.duration}
                    </ThemedText>
                    <ThemedText style={{ fontSize: 11, color: '#666', fontStyle: 'italic' }}>
                      "{item.comments}"
                    </ThemedText>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#210883',
                        padding: 10,
                        borderRadius: 8,
                        marginTop: 8,
                        alignItems: 'center'
                      }}
                      onPress={() => {/* Add booking logic */}}
                    >
                      <ThemedText style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                        Book Now
                      </ThemedText>
                    </TouchableOpacity>
                  </ThemedView>
                ))}
              </ThemedView>
            </ScrollView>
          </View>
        );
      })}
    </ScrollView>
  );
}