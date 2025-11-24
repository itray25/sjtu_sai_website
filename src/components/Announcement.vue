<template>
  <Passage title="通知" :pic-url="pic">
    <NTimeline>
      <NTimelineItem
        v-for="(item, index) in timeLine"
        :key="index"
        :title="item.title"
        :time="item.time"
        :type="item.type"
        @click="handleClick"
      >
      </NTimelineItem>
    </NTimeline>
  </Passage>
</template>
<script>
import { NTimeline, NTimelineItem } from 'naive-ui';
import Passage from './Passage.vue';
import pic from '../assets/background-03-1920x310.jpg';
export default {
  name: 'Home',
  components: {
    Passage,
    NTimeline,
    NTimelineItem,
  },
  data() {
    return {
      pic: pic,
      timeLine: [
        {
          title: '【新闻】人工智能学院学联筹备组招募',
          //content: "通知内容3",
          time: '[2025-2-24]',
          type: 'success',
          href: 'https://mp.weixin.qq.com/s/PVhiIE-f9xzXeg3cUgTe0Q',
        },
        {
          title: '【新闻】智能运动，乒乓盛宴 | 球类运动教学嘉年华',
          //content: "通知内容2",
          time: '[2024-12-30]',
          type: 'success',
          href: 'https://mp.weixin.qq.com/s/OJ9Tcea8nGeyBsVK0UenLA',
        },
        {
          title: '网站上线',
          //content: "通知内容1",
          time: '[2024-12-28]',
          type: 'info',
          href: null,
        },
      ],
    };
  },
  methods: {
    navigateToNewTab(url) {
      window.open(url, '_blank');
    },
    handleClick(event) {
      const target = event.target;
      if (target.classList.contains('n-timeline-item-content__title')) {
        const href = this.getHref(target);
        if (href) {
          window.open(href, '_blank');
        }
      }
    },
    getHref(target) {
      const title = target.innerText.trim();
      const item = this.timeLine.find((item) => item.title === title);
      return item ? item.href : null;
    },
  },
};
</script>
