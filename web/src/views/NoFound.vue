<template>
  <div class="main">
    <img class="nofound" src="../assets/404.3ec06ef.jpg" />
    <h3 class="oh">咦~页面不见了~</h3>
    <router-link to="/home/display" tag="h3" class="lo">返回首页</router-link>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.main {
  width: 467px;
  margin: auto;
  text-align: center;
  font-size: 35px;
  margin-top: 100px;
}
h3 {
  font-weight: 400;
}
.lo {
  color: #0b72a4;
  cursor: pointer;
}
.nofound {
  width: 100%;
  display: inline-block;
}
</style>