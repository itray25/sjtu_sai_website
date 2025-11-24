<template>
  <Passage title="关于我们" :pic-url="pic">
    <p>正在施工中...</p>
  </Passage>
</template>
<script>
import Passage from './Passage.vue';
import pic from '../assets/background-03-1920x310.jpg';
export default {
  name: 'Home',
  components: {
    Passage,
  },
  data() {
    return {
      pic: pic,
    };
  },
};
</script>
