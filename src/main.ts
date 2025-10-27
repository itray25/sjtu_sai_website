import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Naive UI 全局配置
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

const app = createApp(App);

app.mount('#app');
