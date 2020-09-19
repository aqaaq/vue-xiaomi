<template>
  <el-form class="elForm" @submit.native.prevent="save">
    <p class="title">请先登录</p>
    <el-card shadow="always">
      <el-form-item label="用户名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-card>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: "admin",
        password:'123',
      },
    };
  },
  methods: {
    async save() {
      const res = await this.$http.post("/test/login", this.model);
      if (res) {
        this.$message.success(res.message);
        this.$store.commit("assignment", res.token);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.data.username);
        this.$router.push("/categories/list");
      }
    },
  },
};
</script>
<style>
.elForm {
  width: 500px;
  margin: 180px auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 18px;
  line-height: 40px;
  color: #409eff;
  margin: 0;
  padding: 0;
  text-indent: 18px;
}
</style>