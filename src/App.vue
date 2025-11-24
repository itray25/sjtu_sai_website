<script>
import top_menu from './components/Menu.vue';
import cus_footer from './components/AppFooter.vue';
import { NBackTop, NConfigProvider } from 'naive-ui';
export default {
  name: 'App',
  components: {
    top_menu,
    NBackTop,
    NConfigProvider,
    cus_footer,
  },
};
</script>

<template>
  <NConfigProvider>
    <NBackTop></NBackTop>
    <top_menu id="menu" />
    <div style="height: 80px; display: block; background-color: #3f3f3f"></div>
    <div id="content-wrapper">
      <router-view #default="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <cus_footer style="z-index: 1001; position: relative"></cus_footer>
  </NConfigProvider>
</template>

<style scoped>
#menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
