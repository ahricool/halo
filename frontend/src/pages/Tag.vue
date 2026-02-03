<template>
  <Layout>
    <template #header>
      <div class="tag-header">
        <h1>Tag: {{ tagName }}</h1>
        <p v-if="tag">{{ tag.count }} posts</p>
      </div>
    </template>

    <div id="primary" class="content-area">
      <div v-if="posts.length > 0" class="posts-container">
        <article
          v-for="post in posts"
          :key="post.id"
          class="post-item"
        >
          <router-link :to="`/post/${post.id}`" class="post-link">
            <div v-if="post.cover" class="post-thumbnail">
              <img :src="post.cover" :alt="post.title" loading="lazy" />
            </div>
            <div class="post-content">
              <h2 class="post-title">{{ post.title }}</h2>
              <div class="post-meta">
                <span class="post-author">{{ post.author.name }}</span>
                <span class="post-date">{{ formatDate(post.publishedAt) }}</span>
              </div>
              <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
            </div>
          </router-link>
        </article>
      </div>

      <div v-else class="no-posts">
        <p>No posts found with this tag.</p>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Layout from '../components/Layout.vue';
import { mockPosts, mockTags } from '../mocks/data';
import type { Post, Tag } from '../services/api';

const route = useRoute();
const posts = ref<Post[]>([]);
const tag = ref<Tag | null>(null);
const tagName = ref('');

onMounted(async () => {
  // TODO: Fetch from API when backend is ready
  const tagSlug = route.params.tag as string;
  tag.value = mockTags.find(t => t.slug === tagSlug) || null;
  tagName.value = tag.value?.name || tagSlug;
  
  // Filter posts by tag
  posts.value = mockPosts.filter(post => 
    post.tags.some(t => t.slug === tagSlug)
  );
});

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>

<style scoped>
.tag-header {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #FE9A9A 0%, #FE7C7C 100%);
  color: white;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.tag-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.tag-header p {
  margin: 0;
  font-size: 1.125rem;
  opacity: 0.9;
}

.posts-container {
  display: grid;
  gap: 2rem;
}

.post-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.post-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.post-link {
  display: flex;
  gap: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.post-thumbnail {
  width: 300px;
  height: 200px;
  flex-shrink: 0;
  overflow: hidden;
}

.post-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.post-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666;
}

.post-excerpt {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.no-posts {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

@media (max-width: 768px) {
  .post-link {
    flex-direction: column;
  }

  .post-thumbnail {
    width: 100%;
  }

  .tag-header h1 {
    font-size: 1.75rem;
  }
}
</style>
