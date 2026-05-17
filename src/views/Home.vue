<template>
  <div class="home">
    <MobileBar title="Home" />
    <div class="content">
      <div class="hero">
        <h1>Hello!</h1>
        <p>How can I help you today?</p>
      </div>
      <div class="input-area">
        <textarea v-model="message" placeholder="Type your message..." rows="3"></textarea>
        <button @click="send" :disabled="!message.trim()" class="send-btn">Send</button>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MobileBar from '../components/MobileBar.vue'
import BottomNav from '../components/BottomNav.vue'
const message = ref('')
const send = () => { console.log('Sending:', message.value); message.value = '' }
</script>

<style scoped>
.home { min-height: 100vh; display: flex; flex-direction: column; background: var(--bg); }
.content { flex: 1; padding: 1rem; padding-top: 60px; padding-bottom: 70px; }
.hero { text-align: center; padding: 2rem 0; }
.hero h1 { font-size: 1.5rem; }
.hero p { color: var(--gray); }
.input-area { position: fixed; bottom: 70px; left: 0; right: 0; padding: 1rem; background: var(--white); display: flex; gap: 0.5rem; }
textarea { flex: 1; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 12px; resize: none; font-family: inherit; }
.send-btn { padding: 0.75rem 1.5rem; background: var(--primary); color: white; border: none; border-radius: 12px; font-weight: 600; }
.send-btn:disabled { opacity: 0.5; }
</style>