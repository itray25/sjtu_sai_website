import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import router from './router/index';

createApp(App).use(router).mount('#app');

const style = document.createElement('style');
style.textContent = `
    .n-menu-item-content:hover .n-menu-item-content__icon,
    .n-menu-item-content:hover .n-menu-item-content-header,
    .n-menu-item-content:hover .n-menu-item-content-header a {
        color: #fccf65 !important;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
  const menu = document.querySelector<HTMLElement>('.menu');
  if (menu) {
    if (window.scrollY > 60) {
      menu.style.backgroundColor = 'rgba(41, 41, 41, 0.62)';
    } else {
      menu.style.backgroundColor = '';
    }
  }
});

const titleElement = document.querySelector<HTMLElement>('.title');
if (titleElement) {
  titleElement.addEventListener('click', () => {
    router.push('/');
  });
}

const aiChatElement = document.querySelector<HTMLElement>('.ai-chat');
if (aiChatElement) {
  aiChatElement.addEventListener('click', () => {
    window.open('https://chat.sai-sjtu.top', '_blank');
  });
}
