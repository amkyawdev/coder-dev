<template>
  <div class="get-started">
    <div class="logo">
      <div class="logo-icon">M</div>
    </div>
    <h1>Welcome to Mobile App</h1>
    <p>Your AI-powered companion</p>
    <div class="actions">
      <button @click="start" class="btn-primary">Get Started</button>
      <button @click="login" class="btn-secondary">Sign In</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const start = () => router.push('/home')
const login = () => router.push('/home')
</script>

<style scoped>
.get-started {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}
.logo-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
  margin-bottom: 2rem;
}
h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
p { color: var(--gray); margin-bottom: 2rem; }
.actions { display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 300px; }
.btn-primary, .btn-secondary {
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
}
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}
.btn-secondary {
  background: var(--white);
  color: var(--primary);
  border: 2px solid var(--primary);
}
</style>