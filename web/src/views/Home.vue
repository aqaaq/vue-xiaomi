<template>
  <div class="mains">
    <div class="bg-black">
      <div class="top_sliderbar">
        <ul>
          <li class="first">小米商城</li>
          <span>|</span>
          <li>MIUI</li>
          <span>|</span>
          <li>Lot</li>
          <span>|</span>
          <li class="down">下载app</li>
        </ul>
        <ul>
          <router-link tag="li" to="/login" v-if="!$store.getters.user"
            >登录</router-link
          >
          <li v-else class="user">
            {{ $store.getters.user.username }}
            <i class="iconfont icon-you"></i>
            <div class="user_children tran">
              <router-link to="/home/order" tag="div">我的订单</router-link>
              <div @click="exit">退出登录</div>
            </div>
          </li>
          <router-link tag="li" v-show="!$store.getters.user" to="/register"
            >注册</router-link
          >
          <li>消息通知</li>
          <li
            :class="{ cart: true, bg: cart.length > 0 }"
            @mousemove="move"
            @mouseout="out"
          >
            <i class="iconfont icon-gouwuche"></i>购物车
            <div class="cart_children" ref="cart">
              <div ref="box">
                <div class="empty" v-show="cart.length == 0">
                  <p>购物车还没有商品，赶紧选购吧!</p>
                </div>
                <div class="goods" v-show="cart.length > 0">
                  <router-link
                    tag="div"
                    :to="'/home/details/' + item.id"
                    class="goods_item"
                    v-for="(item, key) in cart"
                    :key="key"
                  >
                    <img :src="item.icon" />
                    <p class="name">
                      {{ item.name }} {{ item.color }} {{ item.size }}
                    </p>
                    <p class="price">{{ item.price }} 元 * {{ item.num }}</p>
                  </router-link>

                  <div class="goods_footer">
                    <div class="left">
                      <p>共 {{ $store.state.count }} 件商品</p>
                      <p class="price">{{ $store.state.price }}元</p>
                    </div>
                    <router-link to="/mi/cart" tag="button" class="btn"
                      >去购物车结算</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 顶边栏 end-->
    <Header :model="model" />
    <keep-alive :exclude="['Details', 'Order', 'OrderInfo']">
      <router-view :key="$route.path" />
    </keep-alive>
    <div class="footer">
      <Footer />
    </div>
    <!-- 底边栏 end -->
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Header from "../components/Header";
export default {
  name: "Home",
  data() {
    return {
      model: [],
      show: false,
    };
  },
  methods: {
    async fetch() {
      this.model = await this.$http.get("test/header-nav");
    },
    move() {
      this.$refs.cart.style.height = this.$refs.box.scrollHeight + "px";
    },
    out() {
      this.$refs.cart.style.height = 0;
    },
    exit() {
      this.$store.commit("exit");
      this.$router.push("/home/display");
    },
  },
  components: {
    Header,
    Footer,
  },
  created() {
    this.fetch();
    window.confirm("该网站纯属个人练习！");
  },
  computed: {
    cart() {
      return this.$store.getters.cartList_;
    },
  },
  watch: {
    // 当路由变化时 将 滚轮高度重置
    "$route.path"() {
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.mains {
  margin-bottom: 70px;
  min-width: $max-width * 1px;
  position: relative;
}
.top_sliderbar {
  display: flex;
  justify-content: space-between;
  background: #333;
  width: $max-width * 1px;
  margin: auto;
  ul {
    list-style: none;
    display: flex;
    color: #b0b0b0;
    font-weight: 400;
    font-size: 14px;
    align-items: center;
    span {
      font-size: 10px;
      color: #b1acac;
    }
    li {
      height: 100%;
      padding: 15px 30px;
      &:hover {
        color: rgb(231, 224, 224);
        cursor: pointer;
      }
    }
    .first{
      padding-left: 0 !important;
    }
    & last-child {
      border: 0;
    }
  }
}
.user {
  position: relative;
  &:hover {
    background: white;
    color: #ff6700 !important;
  }
  &:hover > .tran {
    height: 100px;
  }
  & .iconfont {
    font-size: 13px;
  }
}
.tran {
  height: 0;
}
.user_children {
  position: absolute;
  width: 100%;
  background: white;
  color: black;
  top: 100%;
  left: 0;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: 0.5s;

  overflow: hidden;
  & div {
    padding: 5px 0;
    line-height: 32px;
    transition: 0.5s;
    &:hover {
      color: #ff6700;
      background: rgba(#333, 0.2);
    }
  }
}
.cart {
  position: relative;
  background: rgb(200 193 193 / 20%);
  &:hover {
    color: #ff6700 !important;
    background: white;
  }
  & > .iconfont {
    font-size: 13px;
    margin-right: 5px;
    vertical-align: middle;
  }
  & > .cart_children {
    position: absolute;
    text-align: center;
    top: 100%;
    right: 0;
    z-index: 50;
    height: 0;
    width: 300%;
    color: black;
    background: white;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transition: 0.5s;
    overflow: hidden;
    & .empty {
      height: 110px;
      line-height: 110px;
    }
  }
}

.goods {
  & > .goods_item {
    &:nth-last-of-type(2) {
      border: 0;
    }
    width: 85%;
    padding: 15px 0;
    margin: auto;
    border-bottom: 1px solid rgba(#ccc, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    background: white;
    & > img {
      width: 60px;
      height: auto;
      margin-right: 10px;
    }
    & > .name {
      flex-grow: 1;
      text-align: left;
    }
    & > .price {
      min-width: 90px;
    }
  }
}
.bg {
  background: #ff6700;
  color: white;
}
.goods_footer {
  margin: auto;
  height: 70px;
  padding: 0 25px;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .left {
    width: 180px;
    font-size: 12px;
    font-weight: 200;
    text-align: left;
  }
  & .price {
    font-size: 18px;
    color: #ff6700;
  }
  & .btn {
    padding: 10px;
    border: none;
    outline: none;
    background: #ff6700;
    color: white;
  }
}
</style>
