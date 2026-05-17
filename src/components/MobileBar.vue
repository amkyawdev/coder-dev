<template>
  <div class="mobile-bar">
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>

<style scoped>
.mobile-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 100;
  padding-top: env(safe-area-inset-top);
}
.title { font-weight: 600; font-size: 1rem; }
</style>