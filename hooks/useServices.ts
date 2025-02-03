import axios from '@/lib/axios';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface Service {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  comments: string;
  category: {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
  };
}

export const useServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Service[]>('/api/services');
      setServices(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch services');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/services/${id}`);
      await fetchServices();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete service');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    loading,
    error,
    fetchServices,
    deleteService
  };
};