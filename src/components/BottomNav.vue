<template>
  <nav class="bottom-nav">
    <router-link to="/home" class="nav-item">
      <span class="icon">🏠</span>
      <span>Home</span>
    </router-link>
    <router-link to="/profile" class="nav-item">
      <span class="icon">👤</span>
      <span>Profile</span>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--white);
  display: flex;
  box-shadow: 0 -1px 3px rgba(0,0,0,0.1);
  padding-bottom: env(safe-area-inset-bottom);
}
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--gray);
  font-size: 0.75rem;
  gap: 2px;
}
.router-link-active { color: var(--primary); }
.icon { font-size: 1.25rem; }
</style>