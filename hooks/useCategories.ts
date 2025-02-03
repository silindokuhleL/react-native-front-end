import axios from '@/lib/axios';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
  icon: string;
  services?: Service[];
}

interface Service {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  comments: string;
}

export const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Category[]>('/api/categories');
      console.log('Categories from API:', response.data);
      setCategories(response.data);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Failed to fetch categories');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories
  };
};