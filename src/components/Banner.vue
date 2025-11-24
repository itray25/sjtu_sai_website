<template>
  <div id="banner_wrapper">
    <img id="banner" src="../assets/new_bg_2x.png" style="width: 100%; height: 100%; object-fit: cover" />
    <img id="main_logo" src="../assets/float_2x.png" />
    <div class="carousel-container">
      <div class="carousel">
        <div class="carousel-above"></div>
        <div class="carousel-tag">
          <NEllipsis :tooltip="false" class="carousel-tag-text">{{ cover_info[currentIndex].title }}</NEllipsis>
        </div>
        <NCarousel
          class="carousel-inner"
          :autoplay="true"
          :show-arrow="true"
          :dot-type="'line'"
          dot-placement="top"
          @update:current-index="callback"
        >
          <img
            v-for="(item, index) in cover_info"
            :key="index"
            class="carousel-img"
            :src="item.img"
            @click="navigateToNewTab(item.href)"
          />
        </NCarousel>
      </div>
      <div class="grid-container">
        <div v-for="(item, index) in grid_info" :key="index" class="grid-item" @click="navigateToNewTab(item.href)">
          <img :src="item.img" style="width: 100%; height: 100%; object-fit: cover" />
          <div class="grid-tag">
            <span class="grid-dot"></span>
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="news-title">
      <NGradientText type="info" style="font-weight: bold">近期动态</NGradientText>
    </div>
  </div>
</template>
<script>
import { NCarousel, NEllipsis, NGradientText } from 'naive-ui';

export default {
  name: 'Banner',
  components: {
    NCarousel,
    NEllipsis,
    NGradientText,
  },
  data() {
    const baseUrl = import.meta.env.BASE_URL;
    return {
      currentIndex: 0,
      cover_info: [
        {
          title: '交小AI上线啦！',
          img: `${baseUrl}img/banner1.png`, // 使用 BASE_URL
          href: 'https://chat.sai-sjtu.top',
        },
        {
          title: '人工智能学院学生论坛',
          img: `${baseUrl}img/banner2.png`, // 使用 BASE_URL
          href: 'https://forum.sai-sjtu.top/forum/',
        },
        {
          title: '关于我们',
          img: `${baseUrl}img/banner3.png`, // 使用 BASE_URL
          href: 'https://chat.sai-sjtu.top/landing/about/',
        },
      ],
      grid_info: [
        {
          title: '院系门户',
          img: `${baseUrl}img/sq1.png`, // 使用 BASE_URL
          href: 'https://soai.sjtu.edu.cn',
        },
        {
          title: '人才培养',
          img: `${baseUrl}img/sq2.png`, // 使用 BASE_URL
          href: 'https://soai.sjtu.edu.cn/cn/news/bkspy',
        },
        {
          title: '科学研究',
          img: `${baseUrl}img/sq3.png`, // 使用 BASE_URL
          href: 'https://soai.sjtu.edu.cn/cn/article/kygk',
        },
        {
          title: '党建工作',
          img: `${baseUrl}img/sq4.png`, // 使用 BASE_URL
          href: 'https://soai.sjtu.edu.cn/cn/news/djdt',
        },
      ],
    };
  },
  methods: {
    callback(index) {
      const carouselTagText = document.querySelector('.carousel-tag-text');
      if (carouselTagText) {
        carouselTagText.style.transition = 'opacity 0.4s ease-in-out';
        carouselTagText.style.opacity = '0';

        window.setTimeout(() => {
          this.currentIndex = index;
          carouselTagText.style.opacity = '1';
        }, 400);
      }
    },
    navigateToNewTab(url) {
      window.open(url, '_blank');
    },
  },
};
</script>
<style scoped>
#banner_wrapper {
  position: relative;
  width: 100%;
  height: 800px;
  /* 示例高度 */
}

.carousel-container {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  height: 100%;
  gap: 20px;
  /* carousel 和 grid-container 之间的间距 */
}

.carousel {
  width: 700px;
  /* 或者设置固定宽度 */
  flex-shrink: 0;
  /* 防止宽度被压缩 */
  height: 475px;
  position: relative;
  cursor: pointer;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 两列布局 */
  grid-template-rows: repeat(2, 1fr);
  /* 两行布局 */
  gap: 20px;
  /* 子元素之间的间距 */
  width: 475px;
  /* 网格宽度 */
  height: 475px;
  /* 网格高度，与宽度一致，形成正方形 */
}

.grid-item {
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  position: relative;
  /* Ensure child elements with absolute positioning are scoped to this container */
}

.grid-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-start;
  padding-left: 8px;
}

.grid-dot {
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  box-shadow:
    0 2px 4px rgba(102, 126, 234, 0.4),
    0 4px 8px rgba(118, 75, 162, 0.3),
    inset -2px -2px 4px rgba(0, 0, 0, 0.2),
    inset 2px 2px 4px rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

/* 修复 n-gradient-text 渐变显示 */
.news-title :deep(.n-gradient-text) {
  background: linear-gradient(252deg, rgba(32, 128, 240, 0.6) 0%, #2080f0 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  color: transparent !important;
}

/* 自适应隐藏逻辑 */
@media (max-width: 1200px) {
  .grid-container {
    display: none;
    /* 隐藏整个网格 */
  }
}

@media (max-width: 800px) {
  .carousel {
    max-width: 100%;
    /* 让 carousel 占满宽度 */
  }
}
</style>
