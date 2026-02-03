<template>
  <div class="pjax">
    <section id="main-container" class="container">
      <!-- Header -->
      <header class="site-header" itemscope itemtype="http://schema.org/WPHeader">
        <div class="header-inner">
          <Header />
        </div>
      </header>

      <!-- Main Content -->
      <main id="page" class="main site wrapper">
        <div class="column">
          <header class="header" itemscope itemtype="http://schema.org/WPHeader">
            <slot name="header"></slot>
          </header>
        </div>

        <div id="content" class="main-inner site-content">
          <slot></slot>
          <aside v-if="showSidebar" class="sidebar">
            <Sidebar />
          </aside>
        </div>
      </main>
    </section>

    <!-- Mobile Sidebar -->
    <section class="site-sidebar">
      <div class="sidebar-close" @click="closeSidebar"></div>
      <div class="sidebar-inner">
        <Sidebar />
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer" role="contentinfo">
      <div class="site-info">
        <Footer />
      </div>
    </footer>

    <!-- TODO: Add widgets (back to top, etc.) -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '../stores/theme';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Sidebar from './Sidebar.vue';

interface Props {
  showSidebar?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: true,
});

const themeStore = useThemeStore();

function closeSidebar() {
  themeStore.toggleSidebar();
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-inner {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.main-inner > :first-child {
  flex: 1;
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
}

.site-sidebar {
  display: none;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .site-sidebar {
    display: block;
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 1000;
  }

  .site-sidebar.open {
    right: 0;
  }

  .sidebar-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}

.site-footer {
  margin-top: 4rem;
  padding: 2rem 0;
  background: #f5f5f5;
  text-align: center;
}
</style>
