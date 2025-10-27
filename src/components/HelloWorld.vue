<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NSpace, NCard, NInput, NSwitch, NTag, NAlert, useMessage } from 'naive-ui';

defineProps<{ msg: string }>();

const count = ref(0);
const inputValue = ref('');
const switchValue = ref(false);
const message = useMessage();

const showMessage = () => {
  message.success('这是来自 Naive UI 的消息！');
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <NSpace vertical :size="20" style="margin-top: 20px">
    <!-- 按钮示例 -->
    <NCard title="按钮示例" size="small">
      <NSpace>
        <NButton type="primary" @click="count++"> 计数: {{ count }} </NButton>
        <NButton type="info" @click="showMessage">显示消息</NButton>
        <NButton type="success">成功按钮</NButton>
        <NButton type="warning">警告按钮</NButton>
        <NButton type="error">错误按钮</NButton>
      </NSpace>
    </NCard>

    <!-- 输入框示例 -->
    <NCard title="输入框示例" size="small">
      <NSpace vertical>
        <NInput v-model:value="inputValue" placeholder="请输入内容" />
        <div v-if="inputValue">你输入的内容: {{ inputValue }}</div>
      </NSpace>
    </NCard>

    <!-- 开关和标签示例 -->
    <NCard title="开关和标签" size="small">
      <NSpace>
        <NSwitch v-model:value="switchValue" />
        <NTag type="success">成功标签</NTag>
        <NTag type="info">信息标签</NTag>
        <NTag type="warning">警告标签</NTag>
        <NTag type="error">错误标签</NTag>
      </NSpace>
    </NCard>

    <!-- 提示框示例 -->
    <NCard title="提示框示例" size="small">
      <NAlert v-if="switchValue" title="开关已打开" type="success" />
      <NAlert v-else title="开关已关闭" type="info" />
    </NCard>
  </NSpace>

  <div style="margin-top: 30px">
    <p class="read-the-docs">
      访问
      <a href="https://www.naiveui.com/" target="_blank">Naive UI 官网</a>
      了解更多组件
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
