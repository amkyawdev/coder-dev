<template>
  <button :class="['btn', variant]" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { default: 'primary', type: String },
  disabled: { default: false, type: Boolean }
})
</script>

<style scoped>
.btn { padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 600; border: none; font-family: inherit; }
.primary { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; }
.secondary { background: var(--white); color: var(--primary); border: 2px solid var(--primary); }
.btn:disabled { opacity: 0.5; }
</style>