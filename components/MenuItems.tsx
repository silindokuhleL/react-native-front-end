import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function MenuItems() {
  const defaultImage = require('../assets/images/haircut.jpg');

  type CategoryName = 'Hair Services' | 'Nail Services' | 'Massage & Spa' | 'Facial & Skin';

  const categoryIcons: Record<CategoryName, keyof typeof Ionicons.glyphMap> = {
    'Hair Services': 'cut-outline',
    'Nail Services': 'hand-left-outline',
    'Massage & Spa': 'body-outline',
    'Facial & Skin': 'water-outline'
  };

  const menuCategories: Record<CategoryName, Array<{
    id: number;
    name: string;
    description: string;
    price: string;
    duration: string;
    rating: number;
    reviews: number;
    image: any;
    comments: string;
  }>> = {
    'Hair Services': [
      { 
        id: 1, 
        name: 'Haircut', 
        description: 'Professional styling', 
        price: 'R450', 
        duration: '45 min',
        rating: 4.8,
        reviews: 124,
        image: defaultImage,
        comments: 'Highly recommended!'
      },
      { 
        id: 2, 
        name: 'Hair Color', 
        description: 'Full color treatment', 
        price: 'R850', 
        duration: '2 hrs',
        rating: 4.7,
        reviews: 89,
        image: defaultImage,
        comments: 'Amazing results'
      },
      { 
        id: 3, 
        name: 'Blow Dry', 
        description: 'Style and volume', 
        price: 'R300', 
        duration: '30 min',
        rating: 4.6,
        reviews: 67,
        image: defaultImage,
        comments: 'Quick and perfect'
      },
      { 
        id: 6, 
        name: 'Hair Treatment', 
        description: 'Deep conditioning', 
        price: 'R600', 
        duration: '1 hr',
        rating: 4.9,
        reviews: 45,
        image: defaultImage,
        comments: 'Restored my hair!'
      },
    ],
    'Nail Services': [
      { 
        id: 4, 
        name: 'Gel Nails', 
        description: 'Long-lasting polish', 
        price: 'R550', 
        duration: '1 hr',
        rating: 4.9,
        reviews: 112,
        image: defaultImage,
        comments: 'Worth every cent'
      },
    ],
    'Facial & Skin': [
      { 
        id: 5, 
        name: 'Deep Cleansing', 
        description: 'Thorough skin treatment', 
        price: 'R750', 
        duration: '1.5 hrs',
        rating: 4.8,
        reviews: 94,
        image: defaultImage,
        comments: 'Amazing experience'
      },
    ],
    'Massage & Spa': [
      { 
        id: 8, 
        name: 'Full Body Massage', 
        description: 'Relaxing therapy', 
        price: 'R950', 
        duration: '90 min',
        rating: 4.9,
        reviews: 156,
        image: defaultImage,
        comments: 'Pure bliss!'
      },
    ],
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {(Object.entries(menuCategories) as [CategoryName, typeof menuCategories[CategoryName]][]).map(([category, items]) => (
        <View key={category}>
          <ThemedView style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            padding: 15,
            paddingBottom: 10 
          }}>
            <Ionicons name={categoryIcons[category]} size={24} color="#210883" />
            <ThemedText style={{ 
              fontSize: 20, 
              fontWeight: 'bold',
              marginLeft: 10
            }}>
              {category}
            </ThemedText>
          </ThemedView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ThemedView style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
              {items.map((item) => (
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
                    {item.price}
                  </ThemedText>
                  <Image 
                    source={item.image || defaultImage}
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
      ))}
    </ScrollView>
  );
}