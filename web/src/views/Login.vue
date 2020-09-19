<template>
  <div class="container">
    <div class="main">
      <div class="header">
        <img src="../assets/mis_logo.png" />
      </div>
    </div>
    <div class="_body">
      <div>
        <form class="form" @submit.prevent="login">
          <h3 class="title">账号登录</h3>
          <div>
            <input v-model="model.name" type="text" placeholder="username" />
          </div>
          <div>
            <input v-model="model.password" type="password" placeholder="password" />
          </div>
          <div>
            <button type="submit">登录</button>
          </div>
          <div class="help">
            <router-link tag="span" to="/register">立即注册</router-link>|
            <span>忘记密码？</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: "admin",
        password: "123",
      },
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("/login", this.model);
      if (res) {
        const { data, cartList, message, token } = res;
        //element ui 弹窗
        this.$message.success(message);
        //localhost 存储token
        localStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(data));
        this.$store.commit("setUser", JSON.stringify(data));
        this.$store.commit("setToken", token);
        sessionStorage.setItem("cartList", JSON.stringify(cartList));
        this.$store.commit("setCartList", cartList);
        //页面跳转首页
        this.$router.replace("/home/display");
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.container {
  background: white;
}
.main {
  width: 1226px;
  min-width: 1226px;
  margin: auto;
}
.header {
  & > img {
    width: 200px;
    height: 100px;
    display: block;
  }
}
._body {
  min-width: 1226px;
  height: 600px;
  background: url("../assets/bg.jpg") no-repeat top center;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  & > div {
    padding-top: 20px;
    width: 410px;
    height: 550px;
    background: white;
    margin-right: 180px;
    & .form > div {
      padding: 0 20px;
    }
    & .form .title {
      color: $paimary-color;
      margin-bottom: 10px;
      font-size: 25px;
      text-align: center;
      font-weight: 400;
    }
    & .form input {
      padding: 18px;
      border: 1px solid rgba(#ccc, 0.5);
      font-size: 18px;
      margin-bottom: 10px;
      width: 100%;
      color: #4a4a4a;
      outline: none;
    }
    & .form button {
      width: 100%;
      background: $paimary-color;
      color: white;
      outline: none;
      padding: 16px 0;
      border: none;
      margin-top: 10px;
      cursor: pointer;
    }
    & .help {
      margin-top: 30px;
      font-size: 15px;
      color: #666;
      text-align: center;
      & span{
        cursor: pointer;
      }
    }
  }
}
</style>