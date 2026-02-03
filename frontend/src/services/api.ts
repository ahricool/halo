import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// API Base URL from environment variable
const baseURL = import.meta.env.VITE_API_BASE || '/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// API interfaces
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: Tag[];
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  views: number;
  likes: number;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface SiteConfig {
  title: string;
  subtitle?: string;
  description?: string;
  logo?: string;
  favicon?: string;
  url: string;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

// API functions
export const api = {
  // Posts
  async getPosts(params?: PaginationParams): Promise<PaginatedResponse<Post>> {
    const response = await apiClient.get('/posts', { params });
    return response.data;
  },

  async getPost(id: string): Promise<Post> {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  },

  async getPostBySlug(slug: string): Promise<Post> {
    const response = await apiClient.get(`/posts/slug/${slug}`);
    return response.data;
  },

  // Pages
  async getPages(params?: PaginationParams): Promise<PaginatedResponse<Page>> {
    const response = await apiClient.get('/pages', { params });
    return response.data;
  },

  async getPage(id: string): Promise<Page> {
    const response = await apiClient.get(`/pages/${id}`);
    return response.data;
  },

  async getPageBySlug(slug: string): Promise<Page> {
    const response = await apiClient.get(`/pages/slug/${slug}`);
    return response.data;
  },

  // Tags
  async getTags(): Promise<Tag[]> {
    const response = await apiClient.get('/tags');
    return response.data;
  },

  async getTag(slug: string): Promise<Tag> {
    const response = await apiClient.get(`/tags/${slug}`);
    return response.data;
  },

  async getPostsByTag(slug: string, params?: PaginationParams): Promise<PaginatedResponse<Post>> {
    const response = await apiClient.get(`/tags/${slug}/posts`, { params });
    return response.data;
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  async getCategory(slug: string): Promise<Category> {
    const response = await apiClient.get(`/categories/${slug}`);
    return response.data;
  },

  async getPostsByCategory(slug: string, params?: PaginationParams): Promise<PaginatedResponse<Post>> {
    const response = await apiClient.get(`/categories/${slug}/posts`, { params });
    return response.data;
  },

  // Site Config
  async getSiteConfig(): Promise<SiteConfig> {
    const response = await apiClient.get('/site/config');
    return response.data;
  },

  // User
  async getUser(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Search
  async searchPosts(query: string, params?: PaginationParams): Promise<PaginatedResponse<Post>> {
    const response = await apiClient.get('/search/posts', {
      params: { q: query, ...params },
    });
    return response.data;
  },
};

export default apiClient;
