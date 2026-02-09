<template>
  <div class="tabs-component">
    <div class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-btn', { active: currentTab === index }]"
        @click="currentTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tabs-content">
      <slot :name="tabs[currentTab]"></slot>
      <!-- Fallback if no specific slot is used, unlikely with this design but good for robustness -->
      <slot v-if="!$slots[tabs[currentTab]]"></slot> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentTab: 0
    }
  }
}
</script>

<style scoped>
.tabs-component {
  margin: 2rem 0;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background-color: var(--c-bg-light);
  border-bottom: 1px solid var(--c-border);
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--c-text-light);
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  color: var(--c-brand);
  background-color: rgba(0,0,0,0.02);
}

.tab-btn.active {
  color: var(--c-brand);
  border-bottom: 2px solid var(--c-brand);
  font-weight: 600;
  background-color: var(--c-bg);
}

.tabs-content {
  padding: 1.5rem;
  background-color: var(--c-bg);
}
</style>
