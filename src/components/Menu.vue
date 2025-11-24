<template>
  <div class="menu">
    <img src="../assets/logo.png" class="logo" alt="sai_logo" />
    <div class="title">
      <NGradientText type="success" style="background-color: white"
        ><b>学生创新空间</b>
        <div class="line"></div
      ></NGradientText>
    </div>

    <NMenu mode="horizontal" :options="menuOptions" responsive class="menu_items" inverted style="color: white" />
    <img src="../assets/ai-chat.png" class="ai-chat" alt="ai_chat" />
  </div>
</template>
<script>
import { People, Megaphone, DocumentText } from '@vicons/ionicons5';
import { NIcon, NMenu, NGradientText } from 'naive-ui';
import { h } from 'vue';
import router from '../router/index.js';
const menuOptions = [
  {
    label: () => h('a', { href: 'https://forum.sai-sjtu.top/forum/', target: '_blank' }, '论坛'),
    key: 'sai_icon',
    disabled: false,
    icon: () => h(NIcon, { size: '30' }, { default: () => h(People) }),
  },
  {
    label: '通知',
    key: 'announcement',
    disabled: false,
    icon: () => h(NIcon, { size: '30' }, { default: () => h(Megaphone) }),
    onClick: () => router.push('/announcement'),
  },
  {
    label: '关于',
    key: 'about',
    disabled: false,
    icon: () => h(NIcon, { size: '30' }, { default: () => h(DocumentText) }),
    onClick: () => router.push('/about'),
    children: [
      {
        label: '关于我们',
        key: 'about_us',
        disabled: false,
        onClick: () => router.push('/about'),
      },
      {
        label: () => h('a', { href: 'https://soai.sjtu.edu.cn', target: '_blank' }, '学院官网'),
        key: 'sai_website',
        disabled: false,
      },
    ],
  },
];
export default {
  name: 'HelloWorld',
  components: {
    //NIcon,
    NMenu,
    NGradientText,
  },
  data() {
    return {
      menuOptions,
    };
  },
};
</script>
