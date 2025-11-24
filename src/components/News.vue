<script>
import { NEllipsis, NPagination } from 'naive-ui';
const baseUrl = import.meta.env.BASE_URL;
export default {
  name: 'News',
  components: {
    NEllipsis,
    NPagination,
  },
  data() {
    return {
      currentIndex: 0,
      page: 1,
      pageSize: 8,
      cover_info: [
        {
          title: '深度学习课堂：杜雅欣分享科研的破晓指南',
          img: `${baseUrl}img/img1.jpg`,
          info: '10月25日下午，由人工智能学院极客中心举办的第六期“Deep Learning深度学习”交流活动顺利举行。本次活动特邀杜雅欣学姐担任主讲，以“科研的破晓指南：从好奇到实践”为主题，为初涉科研的同学们带来了一场内容丰富、条理清晰的入门指南。学院60余名同学参与了本次活动。',
          date: '2025.10.26',
          tag: ['新闻', '深度学习课堂'],
          href: 'https://mp.weixin.qq.com/s/emlUGOTBFBemY8Pn4tZAXg',
        },
        {
          title: '智体融合，球趣无限 | 球类运动教学嘉年华',
          img: `${baseUrl}img/img2.jpg`,
          info: '亲爱的同学们，青春的活力需要在运动场上尽情释放！为鼓励大家走出宿舍、强健体魄，学院特别筹备了专属球类运动福利——不仅提前锁定乒乓球、篮球和羽毛球场地，更邀请专业教练坐镇指导，让每一次运动都充满收获与乐趣。',
          date: '2025.10.23',
          tag: ['通知', '体育'],
          href: 'https://mp.weixin.qq.com/s/0kyQ3KisrAHsxUJruI8XGw',
        },
        {
          title: '“挑战杯”擂主*2！SAIer首次参赛斩获双赛道冠军！',
          img: `${baseUrl}img/img3.jpg`,
          info: '首次征战！双双夺魁！在第十九届 “挑战杯”2025年度中国青年科技创新“揭榜挂帅”擂台赛人工智能领域主擂台赛中，上海交通大学人工智能学院共派出两支队伍出战，全部斩获擂主桂冠（特等奖第一名）！从自主研发的全栈AI加速引擎，到适配多场景的多模态多智能体通用端侧助手，朝气蓬勃的SAIer凭硬核技术“亮剑”挑战杯，为国产人工智能创新发展注入强劲青春动能！',
          date: '2025.10.21',
          tag: ['新闻', '科研'],
          href: 'https://mp.weixin.qq.com/s/ERzLz5MVeh08m6SkZ1lEvQ',
        },
        {
          title: '“一二·九”师生歌会七院联队招募中！',
          img: `${baseUrl}img/img4.jpg`,
          info: '- 成员招募要求 -合唱：材料科学与工程学院、生物医学工程学院 、农业与生物学院、药学院、国际与公共事务学院、智慧能源创新学院、人工智能学院的师生学生指挥：懂乐理或钢琴，音乐感受力好、乐感强，责任心强，有较强的进取心',
          date: '2025.10.21',
          tag: ['通知', '志愿活动'],
          href: 'https://mp.weixin.qq.com/s/yVi35YxWe3BMhjS-5sPnNw',
        },
        {
          title: '“千里同频，情谊无距”校际明信片交流活动',
          img: `${baseUrl}img/img5.jpg`,
          info: '有种情谊，无关距离，却能熠熠生辉。',
          date: '2025.10.21',
          tag: ['通知'],
          href: 'https://mp.weixin.qq.com/s/oQBptBV_nTDyd7fG370GZw',
        },
        {
          title: '2025新生杯篮球赛——人工智能学院赛程预告来啦！（内含抽奖噢！）',
          img: `${baseUrl}img/img6.jpg`,
          info: '本次代表人工智能学院出战的共有三支队伍，他们将用精湛的技术，拍动手中的篮球，以汗水写下辉煌的篇章。',
          date: '2025.10.18',
          tag: ['通知', '体育'],
          href: 'https://mp.weixin.qq.com/s/zaY7jLDAV0K6nkldj94J9g',
        },
        {
          title: 'AI赋能科研新范式！玻尔+SciMaster科研智能体大赛项目答辩，揭秘如何打造超级科研助手',
          img: `${baseUrl}img/img7.jpg`,
          info: '这场答辩不一般！',
          date: '2025.10.17',
          tag: ['活动', '科研'],
          href: 'https://mp.weixin.qq.com/s/v-B4t9rsVnFlkLlYa7g2gw',
        },

        {
          title: '上海交通大学人工智能学院第一次学生大会提案征集',
          img: `${baseUrl}img/news1.png`,
          info: '为充分发挥学生参与学院民主建设的积极作用，畅通建言献策渠道，上海交通大学人工智能学院第一次学生大会（以下简称"大会"）即将召开。现面向全院公开征集提案，让您的真知灼见成为学院发展的源代码，用我们的集体智慧浇筑世界一流人工智能学院的基石！',
          date: '2025.5.2',
          tag: ['新闻'],
          href: 'https://mp.weixin.qq.com/s/PVhiIE-f9xzXeg3cUgTe0Q',
        },
      ],
    };
  },
  computed: {
    paginatedNews() {
      const start = (this.page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.cover_info.slice(start, end);
    },
  },
  methods: {
    navigateToNewTab(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<template>
  <div class="news-container">
    <div class="news-grid">
      <div v-for="(item, index) in paginatedNews" :key="index" class="news-card" @click="navigateToNewTab(item.href)">
        <div class="card-corner"></div>
        <div class="news-image-container">
          <div class="news-image" :style="{ backgroundImage: `url(${item.img})` }"></div>
        </div>
        <div class="news-content">
          <div class="news-title2">
            <NEllipsis :line-clamp="2">{{ item.title }}</NEllipsis>
          </div>
          <div class="news-info-container">
            <NEllipsis v-if="item.info" :line-clamp="3" class="news-info" :tooltip="false">{{ item.info }}</NEllipsis>
          </div>
          <div class="news-footer">
            <div class="news-tags">
              <span v-for="(tag, tagIndex) in item.tag.slice(0, 2)" :key="tagIndex" class="news-tag"> #{{ tag }} </span>
            </div>
            <div class="news-date">{{ item.date }}</div>
          </div>
        </div>
      </div>
    </div>
    <NPagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :item-count="cover_info.length"
      :page-sizes="[4, 8, 16, 32]"
      show-size-picker
      show-quick-jumper
      style="
        margin: 20px auto;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 20px;
      "
    />
  </div>
</template>

<style scoped>
.news-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-bottom: 30px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
}

.news-card {
  position: relative;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.1),
    0 6px 6px rgba(0, 0, 0, 0.05);
}

.card-corner {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 40px solid #2c3e50;
  border-top: 40px solid transparent;
  z-index: 2;
}
.news-image-container {
  position: relative;
  width: 100%;
  padding-top: 60%;
  overflow: hidden;
  order: 1;
}

.news-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.news-card:hover .news-image {
  transform: scale(1.05);
}

.news-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  order: 2;
}

.news-title2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0.75rem 0;
  line-height: 1.4;
  order: 1;
}

.news-info-container {
  flex: 1;
  margin-bottom: 1rem;
  order: 2;
}

.news-info {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  order: 3;
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.news-tag {
  font-size: 0.75rem;
  color: white;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.news-date {
  font-size: 0.8rem;
  color: #7f8c8d;
  background: #f5f7fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }

  .news-container {
    padding: 1rem;
  }
}
</style>
