import type { Post, Page, Tag, Category, SiteConfig } from '../services/api';

export const mockSiteConfig: SiteConfig = {
  title: 'Sakura Theme',
  subtitle: 'A beautiful blog theme for Halo',
  description: 'Halo version of Sakura theme, elegant and beautiful',
  logo: '/images/default/logo.png',
  favicon: '/favicon.ico',
  url: 'https://example.com',
};

export const mockTags: Tag[] = [
  { id: '1', name: 'Vue.js', slug: 'vue-js', count: 10 },
  { id: '2', name: 'TypeScript', slug: 'typescript', count: 8 },
  { id: '3', name: 'Frontend', slug: 'frontend', count: 15 },
  { id: '4', name: 'React', slug: 'react', count: 5 },
  { id: '5', name: 'Node.js', slug: 'node-js', count: 7 },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', count: 20 },
  { id: '2', name: 'Life', slug: 'life', count: 10 },
  { id: '3', name: 'Travel', slug: 'travel', count: 5 },
  { id: '4', name: 'Photography', slug: 'photography', count: 8 },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Welcome to Sakura Theme',
    slug: 'welcome-to-sakura-theme',
    excerpt: 'This is the first post of Sakura theme for Halo 2.x',
    content: `
# Welcome to Sakura Theme

This is a beautiful theme ported from the original Sakura theme for Halo CMS.

## Features

- **Beautiful Design**: Elegant pink color scheme
- **Responsive**: Works great on all devices
- **Modern**: Built with Vue 3 + TypeScript + Vite
- **Fast**: Optimized for performance

## Getting Started

To use this theme, simply install it in your Halo instance and configure it according to your preferences.

Enjoy blogging with Sakura! 🌸
    `,
    cover: '/images/default/cover-1.jpg',
    author: {
      id: '1',
      name: 'Admin',
      avatar: '/images/default/avatar.png',
    },
    tags: [mockTags[0]!, mockTags[2]!],
    categories: [mockCategories[0]!],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    views: 100,
    likes: 10,
  },
  {
    id: '2',
    title: 'Getting Started with Vue 3',
    slug: 'getting-started-vue3',
    excerpt: 'A comprehensive guide to Vue 3 and Composition API',
    content: `
# Getting Started with Vue 3

Vue 3 brings many improvements and new features to the Vue ecosystem.

## Composition API

The Composition API is a new way to organize component logic...

## Performance

Vue 3 is faster and more efficient than Vue 2...
    `,
    cover: '/images/default/cover-2.jpg',
    author: {
      id: '1',
      name: 'Admin',
      avatar: '/images/default/avatar.png',
    },
    tags: [mockTags[0]!, mockTags[1]!],
    categories: [mockCategories[0]!],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    publishedAt: '2024-01-02T00:00:00Z',
    views: 250,
    likes: 25,
  },
  {
    id: '3',
    title: 'TypeScript Best Practices',
    slug: 'typescript-best-practices',
    excerpt: 'Learn the best practices for writing TypeScript code',
    content: `
# TypeScript Best Practices

TypeScript is a powerful tool for JavaScript developers...

## Type Safety

Always use strict mode and avoid using 'any' type...

## Interfaces vs Types

Know when to use interfaces and when to use types...
    `,
    cover: '/images/default/cover-3.jpg',
    author: {
      id: '1',
      name: 'Admin',
      avatar: '/images/default/avatar.png',
    },
    tags: [mockTags[1]!, mockTags[2]!],
    categories: [mockCategories[0]!],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    publishedAt: '2024-01-03T00:00:00Z',
    views: 180,
    likes: 15,
  },
];

export const mockPages: Page[] = [
  {
    id: '1',
    title: 'About',
    slug: 'about',
    content: `
# About Me

Hello! I'm a developer who loves creating beautiful websites.

## Skills

- Frontend Development
- Backend Development
- UI/UX Design

## Contact

Feel free to reach out to me via email.
    `,
    cover: '/images/default/about-cover.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Links',
    slug: 'links',
    content: `
# Friendly Links

Here are some websites I recommend:

- [Vue.js](https://vuejs.org)
- [Vite](https://vitejs.dev)
- [Halo](https://halo.run)
    `,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];
