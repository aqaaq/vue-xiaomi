<template>
  <div class="main">
    <div class="container">
      <img class="mi" src="../assets/mi-logo.png" />
      <h1 class="title">注册账号</h1>
      <form @submit.prevent="save" class="form">
        <input type="text" ref="name" @blur="check" placeholder="账号" v-model="model.username" />
        <input type="password" placeholder="密码" v-model="model.password" />
        <input class="btn" type="submit" value="立即注册" />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async check() {
      if (!this.model.username) {
        return;
      }
      const data = await this.$http.get("name/" + this.model.username);
      if (this.model&&!data) {
        this.$refs.name.focus();
      }
    },
    async save() {
      if (!this.model.password) {
        return false;
      }
      const data = await this.$http.post("users", this.model);
      if (data) {
        this.$message.success("注册成功！");
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style scoped>
.main {
  background: #f5f5f5;
  padding-top: 40px;
  height: 100vh;
  min-width: 1226px;
}
.container {
  margin-top: 30px;
  width: 800px;
  margin: 0 auto;
  background: white;
  text-align: center;
  padding-bottom: 100px;
}
.title {
  margin: 40px 0;
  font-weight: 400;
  font-size: 30px;
}
.mi {
  width: 50px;
  height: 50px;
  display: block;
  margin: auto;
  background: #ff6700;
}
.form {
  width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.form input {
  padding: 15px 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  outline: none;
}
.btn {
  background: #ff6700;
  color: white;
  width: 400px;
  outline: none;
  border: 0;
  transition: 0.5;
  margin: auto;
  margin-top: 20px;
  padding: 15px 0 !important;
}
.btn:hover {
  opacity: 0.6;
  cursor: pointer;
}
</style>