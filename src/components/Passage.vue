<script>
export default {
  name: 'Passage',
  props: {
    title: {
      type: String,
      required: true,
    },
    picUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <div style="display: block; height: 300px; position: relative">
      <img :src="picUrl" alt="Image" style="width: 100%; height: 100%; object-fit: cover" />
      <div
        style="
          text-align: center;
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 80px;
          font-weight: bold;
          color: #f2f2f2;
        "
      >
        {{ title }}
      </div>
    </div>
    <div style="background-color: #d8ecf2; padding: 50px; display: flex; justify-content: center; align-items: center">
      <div style="background-color: white; padding: 50px; width: calc(100% - 100px)">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
