<template>
  <div>
    <banner></banner>
    <news></news>
  </div>
</template>
<script>
import banner from '../components/Banner.vue';
import news from './News.vue';
export default {
  name: 'Home',
  components: {
    banner,
    news,
  },
};
</script>
