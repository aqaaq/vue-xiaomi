<template>
  <div>
    <div class="container">
      <!-- head end -->
      <Body :CategoryList="CategoryList" :imgList="swiperList" />
      <!-- body  -->
      <HomeAd :homead="homead" />
      <!-- home log广告 -->
    </div>
    <!-- head nav end -->
    <!--组件模块  -->
    <div class="bg-gary">
      <div class="container">
        <div class="container_box">
          <Card title="小米闪购" :Data="saleGoods" />
          <!-- 小米闪购 -->
          <div>
            <Box title="手机" :imgList="saleGoods" keywords="小米闪购">
              <template slot="logo">
                <router-link
                  tag="img"
                  :to="item.url"
                  v-for="(item, key) in long_logo01.ads"
                  :key="key"
                  v-lazy="item.image"
                ></router-link>
              </template>
              <template slot="left">
                <router-link
                  tag="img"
                  :to="item.url"
                  v-for="(item, key) in phonead.ads"
                  :key="key"
                  v-lazy="item.image"
                ></router-link>
              </template>
            </Box>
          </div>
          <!-- 家电 -->
          <Grid title="家电" :arr="Jiadian">
            <template slot="logo">
              <router-link
                tag="img"
                :to="item.url"
                v-for="(item, key) in long_logo02.ads"
                :key="key"
                v-lazy="item.image"
                style="curson: pointer"
              ></router-link>
            </template>
            <template slot="left">
              <div
                class="box_shadow _box"
                v-for="(item, key) in jiadian.ads"
                :key="key"
              >
                <router-link
                  tag="img"
                  :to="item.url"
                  v-lazy="item.image"
                ></router-link>
              </div>
            </template>
          </Grid>

          <!--  -->
          <Grid title="智能" :arr="Zhineng">
            <template slot="logo">
              <router-link
                tag="img"
                :to="item.url"
                v-for="(item, key) in long_logo03.ads"
                :key="key"
                v-lazy="item.image"
                style="cursor: pointer"
              ></router-link>
            </template>
            <template slot="left">
              <div
                class="box_shadow _box"
                v-for="(item, key) in zhineng.ads"
                :key="key"
              >
                <router-link
                  tag="img"
                  :to="item.url"
                  v-lazy="item.image"
                ></router-link>
              </div>
            </template>
          </Grid>
        </div>
      </div>
    </div>
    <!--组件模块  end-->
    <!-- 右边操作栏 -->
    <div class="wall">
      <ul class="type-none">
        <li>
          <img class="static" src="../assets/icon001.png" />
          <img class="hover" src="../assets/icon01.png" />
          <p>手机APP</p>
        </li>
        <li>
          <img class="static" src="../assets/icon002.png" />
          <img class="hover" src="../assets/icon02.png" />
          <p>个人中心</p>
        </li>
        <li>
          <img class="static" src="../assets/icon003.png" />
          <img class="hover" src="../assets/icon03.png" />
          <p>售后服务</p>
        </li>
        <li>
          <img class="static" src="../assets/icon004.png" />
          <img class="hover" src="../assets/icon04.png" />
          <p>人工客服</p>
        </li>
        <router-link to="/mi/cart" tag="li" class="cart_icon">
          <span class="cart_num" v-show="$store.state.count > 0">{{
            $store.state.count
          }}</span>
          <img class="static" src="../assets/icon005.png" />
          <img class="hover" src="../assets/icon05.png" />
          <p>购物车</p>
        </router-link>
        <li @click="top" v-show="isshow">
          <img class="static" src="../assets/icon006.png" />
          <img class="hover" src="../assets/icon06.png" />
          <p>回顶部</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Body from "../components/Body";
import HomeAd from "../components/HomeAd";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Box from "../components/Box";
export default {
  name: "Display",
  components: {
    Body,
    HomeAd,
    Card,
    Grid,
    Box,
  },
  data() {
    return {
      long_logo01: {},
      long_logo02: {},
      long_logo03: {},
      phonead: { ads: [] },
      Zhineng: [],
      jiadian: {
        ads: [],
      },
      zhineng: {
        ads: [],
      },
      Jiadian: [],
      CategoryList: [],
      swiperList: [],
      homead: {},
      saleGoods: [],
      isshow: false,
      timer: "",
    };
  },
  methods: {
    scrollTo() {
      if (document.documentElement.scrollTop > 500) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
      this.timer = null;
    },
    top() {
      document.documentElement.scrollTop = 0;
    },
    scrollEvent() {
      if (this.timer) {
        return;
        // clearTimeout(this.timer);
        // this.timer = setTimeout(this.scrollTo, 50);
      } else {
        this.timer = setTimeout(this.scrollTo, 50);
      }
    },
    async fetch() {
      //home-ad
      this.$http.get("ads/home-ad").then((data) => {
        this.homead = data;
      });
      this.$http("ads/swiper-ad").then((data) => {
        this.swiperList = data.ads;
      });
      //body-left
      this.$http.get("test/CategoryList").then((data) => {
        this.CategoryList = data;
      });
      //小米闪购
      this.$http.get("test").then((data) => {
        this.saleGoods = data;
      });

      //家电
      this.$http.get("test/Jiadian").then((data) => {
        this.Jiadian = data;
      });
      // 家电logo
      this.$http.get("ads/jiadian").then((data) => {
        this.jiadian = data;
      });
      //智能logo
      this.$http.get("ads/zhineng").then((data) => {
        this.zhineng = data;
      });
      //智能
      this.$http.get("test/zhineng").then((data) => {
        this.Zhineng = data;
      });
      //手机
      this.$http.get("ads/phone-ad").then((data) => {
        this.phonead = data;
      });
      //long-logo
      this.$http.get("ads/long_logo01").then((data) => {
        this.long_logo01 = data;
      });
      this.$http.get("ads/long_logo02").then((data) => {
        this.long_logo02 = data;
      });
      this.$http.get("ads/long_logo03").then((data) => {
        this.long_logo03 = data;
      });
    },
  },
  created() {
    this.fetch();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
    document.documentElement.scrollTop = 0;
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.container {
  width: $max-width * 1px;
  margin: auto;
}
.wall {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 7;
  margin-top: -200px;
  > ul {
    text-align: center;
    color: #666;
    & > li {
      background: white;
      border-bottom: 1px solid #ccc;
      padding: 10px 13px;
      &:last-child {
        margin-top: 20px;
      }
      > img {
        width: 30px;
        height: 30px;
      }
      .hover {
        display: none;
      }
      .static {
        display: inline-block;
      }
      &:hover {
        color: $paimary-color;
      }
      &:hover > .hover {
        display: inline-block;
      }
      &:hover > .static {
        display: none;
      }
    }
  }
}

.right_container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  transition: left 0.8s linear;
  margin-top: 10px;
  left: 0;
}
.slider {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
}
.right {
  flex-grow: 1;
  padding-top: 10px;
  margin-left: 10px;
  overflow-x: hidden;
  // overflow: hidden;
  // position: relative;
}
.toolbar {
  border-top: 1px solid red;
  background: white;
  height: 100%;
}
.right_box {
  width: 25%;
  text-align: center;
  font-size: 20px;
  color: #666;
  flex-shrink: 0;
  background: #f5f5f5;
  & img {
    height: 160px;
    max-width: 100%;
    margin-top: 10px;
  }
  & .over {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 10px;
  }
  & .name {
    font-size: 14px;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  & .info {
    font-size: 12px;
    color: #ccc;
    margin-bottom: 10px;
  }
  & .price {
    padding-bottom: 15px;
    color: $paimary-color;
  }
}
.cart_icon {
  position: relative;
  & > .cart_num {
    display: inline-block;
    width: 17px;
    height: 17px;
    background: red;
    color: white;
    right: 13px;
    position: absolute;
    top: 5px;
    border-radius: 50%;
  }
}
</style>