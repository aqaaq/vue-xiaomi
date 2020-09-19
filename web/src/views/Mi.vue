<template>
  <div class="main">
    <div class="contain">
      <Header>
        <template slot="tarbar">
          <div class="title">
            <h3>{{$route.meta.title}}</h3>
          </div>
          <p class="sign" v-if="user">
            <span class="liner">{{user.username}}</span>
            <router-link tag="span" to="/home/order">我的订单</router-link>
          </p>
          <p class="sign" v-else>
            <router-link class="liner" tag="span" to="/login">登录</router-link>
            <router-link tag="span" to="/login">注册</router-link>
          </p>
        </template>
      </Header>
    </div>
    <div>
      <keep-alive :include="['Cart']">
        <router-view />
      </keep-alive>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Mi",
  components: {
    Header,
    Footer,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/common.scss";
.contain {
  background: white;
  border-bottom: 2px solid $paimary-color;
}
.title {
  flex-grow: 1;
  font-size: 28px;
  & > h3 {
    margin-left: 30px;
    font-weight: 200;
  }
}
.main {
  background: #f5f5f5;
  min-width: $max-width * 1px;
}
.sign {
  font-size: 13px;
  color: #666;
  & > span {
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
  }
  & > .liner {
    position: relative;
    &::after {
      content: "";
      width: 1px;
      display: inline-block;
      background: #666;
      height: 80%;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>