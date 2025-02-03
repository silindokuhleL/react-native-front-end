import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import axios from '@/lib/axios';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { useServices } from '@/hooks/useServices';
import type { Service } from '@/hooks/useServices';

// Remove the local Service interface since we're importing it

export default function ManageServicesScreen() {
  const { services, loading, error, fetchServices, deleteService } = useServices();

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteService(id);
            if (success) {
              Alert.alert('Success', 'Service deleted successfully');
            } else {
              Alert.alert('Error', 'Failed to delete service');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#210883" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity 
          style={[styles.button, styles.retryButton]}
          onPress={fetchServices}
        >
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <ThemedText style={styles.buttonText}>Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  // Update the icon usage in renderItem
  // Add this near the top imports
  const defaultImage = require('@/assets/images/haircut.jpg');
  
  // Update the renderItem function to include the image
  const renderItem = ({ item }: { item: Service }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Ionicons 
          name={item.category.icon as keyof typeof Ionicons.glyphMap} 
          size={24} 
          color="#210883" 
        />
        <ThemedText style={styles.categoryName}>{item.category.name}</ThemedText>
      </View>
      <ThemedText style={styles.serviceName}>{item.name}</ThemedText>
      <ThemedText style={styles.serviceDescription}>{item.description}</ThemedText>
      <Image 
        source={item.image_path ? { uri: item.image_path } : defaultImage}
        style={styles.serviceImage}
      />
      <View style={styles.serviceDetails}>
        <ThemedText>Price: ₱{item.price}</ThemedText>
        <ThemedText>Duration: {item.duration}</ThemedText>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => {/* TODO: Implement edit */}}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <ThemedText style={styles.buttonText}>Edit</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteService(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <ThemedText style={styles.buttonText}>Delete</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.addButton]}
        onPress={() => {/* TODO: Implement add */}}
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <ThemedText style={styles.buttonText}>Add New Service</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  list: {
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#666',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: '#666',
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    gap: 4,
  },
  addButton: {
    backgroundColor: '#210883',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#F44336',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#210883',
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 8,
  },
});