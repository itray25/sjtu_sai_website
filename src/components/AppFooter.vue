<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <img src="../assets/logo.png" alt="Logo" class="footer-logo" />
      </div>
      <div class="footer-right">
        <div>上海交通大学人工智能学院</div>
        <div>学生创新空间</div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>
        本网站由上海交通大学人工智能学院学生团队维护迭代，仅限内部交流使用， 使用中如发现存在任何问题，请
        <a href="mailto:peterzheng98@sjtu.edu.cn">点击这里</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  background-color: #353535;
  padding: 20px;
  font-size: 14px;
  color: #ffffff !important;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 30px;
}

.footer-left .footer-logo {
  height: 50px;
}

.footer-right {
  margin: 0;
  font-size: 20px;
  padding: 0 13%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-left {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
}

.footer-bottom {
  margin-top: 50px;
  text-align: center;
  font-size: 15px;
  color: #666;
}

.footer-bottom a {
  color: #007bff;
  text-decoration: none;
}

.footer-bottom a:hover {
  text-decoration: underline;
}
</style>
