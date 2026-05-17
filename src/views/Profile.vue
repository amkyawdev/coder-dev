<template>
  <div class="profile">
    <MobileBar title="Profile" />
    <div class="content">
      <div class="avatar-container">
        <div class="avatar">U</div>
        <h2>User</h2>
        <p>user@example.com</p>
      </div>
      <div class="settings">
        <div class="setting-item">
          <span>Edit Profile</span>
          <span class="arrow">›</span>
        </div>
        <div class="setting-item">
          <span>Settings</span>
          <span class="arrow">›</span>
        </div>
        <div class="setting-item">
          <span>Help & Support</span>
          <span class="arrow">›</span>
        </div>
      </div>
      <button @click="logout" class="logout-btn">Sign Out</button>
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MobileBar from '../components/MobileBar.vue'
import BottomNav from '../components/BottomNav.vue'
const router = useRouter()
const logout = () => router.push('/')
</script>

<style scoped>
.profile { min-height: 100vh; display: flex; flex-direction: column; }
.content { flex: 1; padding: 1rem; padding-top: 60px; padding-bottom: 70px; }
.avatar-container { text-align: center; padding: 2rem 0; }
.avatar { width: 80px; height: 80px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; margin: 0 auto 1rem; }
h2 { font-size: 1.25rem; margin-bottom: 0.25rem; }
p { color: var(--gray); font-size: 0.875rem; }
.settings { background: var(--white); border-radius: 12px; padding: 0.5rem; margin-top: 2rem; }
.setting-item { display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid #e5e7eb; }
.setting-item:last-child { border-bottom: none; }
.arrow { color: var(--gray); font-size: 1.25rem; }
.logout-btn { width: 100%; padding: 1rem; margin-top: 2rem; background: #fee2e2; color: #dc2626; border: none; border-radius: 12px; font-weight: 600; }
</style>