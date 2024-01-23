import axios from 'axios';
import { ListingInterface } from './listingModel';

const API_URL = 'https://mocki.io/v1/efd216d3-d8eb-4bc4-9d53-6cb8a054d20d';

export const TinyForceApi = {
  getPosts: () => {
    return axios.get<ListingInterface[]>(API_URL);
  },
};

// src/utils/api.ts
export async function getProductDetailsById(productId: number) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const productDetails = await response.json();
    return productDetails;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
}
