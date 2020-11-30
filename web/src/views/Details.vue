<template>
  <div class="container" v-if="model.name">
    <div class="main">
      <div class="adsorb">
        <div class="goods">
          <span class="title">{{ model.name }}</span
          >|
          <span class="name">{{ model.name }}</span>
        </div>
        <div class="menu">
          <span>概述</span>
          <span>参数</span>
          <span>F码通道</span>
          <span>咨询客服</span>
          <span>用户评价</span>
        </div>
      </div>
    </div>
    <div style="background:white">
      <div class="goods_info">
        <!-- 图片swiper -->
        <div class="left">
          <swiper :imgList="currImg" :open="true" form="1" />
        </div>
        <!-- goods info-->
        <div class="right">
          <span class="title">{{ model.name }}</span>
          <p class="info">{{ model.info }}</p>
          <p class="paimary-color m-t5">小米自营</p>
          <p class="paimary-color title">
            {{ currVal.size[active01].price }}元
          </p>
          <div class="address">
            <i class="iconfont icon-gaopinxiaohui"></i>
            <span>
              北京 北京市 海淀区 清河街道
              <span class="color-primary">修改</span>
            </span>
            <br />
            <span class="color-primary">有现货</span>
          </div>
          <!-- 版本 -->
          <h4 class="tag">版本信息</h4>
          <div class="version">
            <ul class="type-none" v-if="currVal.size[0].name">
              <li
                :class="{ active: active01 === key ? true : false }"
                v-for="(item, key) in currVal.size"
                :key="key"
                v-show="item.name"
                @click="active01 = key"
              >
                {{ item.name }}
              </li>
            </ul>
            <ul v-else class="type-none">
              <li class="active">默认</li>
            </ul>
          </div>
          <h4 class="tag" v-if="model.version[0].color">选择颜色</h4>
          <div class="version" v-if="model.version[0].color">
            <ul class="type-none">
              <li
                :class="{ active: active === key ? true : false }"
                v-for="(item, key) in model.version"
                :key="key"
                @click="active = key"
              >
                {{ item.color }}
              </li>
            </ul>
          </div>
          <div class="address">
            <p class="color-666">
              {{ model.name }} {{ currVal.size[active01].name }}
              {{ currVal.color }}
              <span style="float:right"
                >{{ currVal.size[active01].price }} 元</span
              >
            </p>
            <p class="price color-primary">
              总计:{{ currVal.size[active01].price }}元
            </p>
          </div>

          <div class="btn">
            <button @click="cartList_push" class="add paimary-color">
              加入购物车
            </button>
            <button class="like">喜欢</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-html="model.content"></div>
  </div>
</template>
<script>
import Swiper from "../components/Swiper.vue";
export default {
  name: "Details",
  props: { id: { type: String, required: true } },
  components: {
    Swiper,
  },
  data() {
    return {
      model: {},
      active: 0,
      active01: 0,
    };
  },
  methods: {
    async fetch() {
      if (!this.id) {
        return false;
      }
      this.model = await this.$http.get(`/goods/${this.id}`);
      if (!this.model.version[0].size.name) {
        this.model.version[0].size.name = "默认";
      }
    },
    async cartList_push() {
      if (!this.$store.getters.user) {
        return this.$router.push("/mi/cart");
      }
      //添加的物品数据
      const data = {
        version: this.active,
        size: this.active01,
        id: this.model._id,
        num: 1,
      };
      var cartList = [...this.$store.state.cartList];
      var falg = false;
      //初始化 购物车没有物品 物品id数组为空
      if (cartList.length > 0) {
        for (let i = 0; i < cartList.length; i++) {
          if (
            cartList[i].id._id === data.id &&
            cartList[i].size === data.size &&
            cartList[i].version === data.version
          ) {
            cartList[i].num += data.num;
            falg = true;
            break;
          }
        }
      }
      if (!falg) {
        cartList.push(data);
      }
      //向后端请求改变 数据；
      this.edit(cartList);
      this.$router.push("/mi/cart");
    },
    async edit(cartList) {
      var id = this.$store.getters.user._id || "";
      var res = await this.$http.put("/cart/" + id, { item: cartList });
      sessionStorage.setItem("cartList", JSON.stringify(res));
      this.$store.commit("setCartList", res);
    },
  },
  computed: {
    currVal() {
      return this.model.version[this.active] || [];
    },
    currImg() {
      // 这个纯属和后端数据 对不上 所以 偷懒改格式了
      var list = this.currVal.image.map((val) => {
        return {
          image: val,
        };
      });
      return list;
    },
  },
  watch: {
    id() {
      this.fetch();
    },
    active() {
      this.active01 = 0;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.container {
  border: 1px solid #ccc;
  background: $main-color;
}
.main {
  box-shadow: 0px 8px 13px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 30;
  background: white;
}
.title {
  font-size: 28px;
  margin-right: 10px;
}
.adsorb {
  margin: auto;
  width: $max-width * 1px;
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: space-between;

  & .goods {
    line-height: 60px;

    .name {
      margin-left: 5px;
    }
  }
  & .menu {
    font-size: 16px;
    & > span {
      display: inline-block;
      padding: 0 15px;
      color: #666;
      border-right: 1px solid #ccc;
      &:last-child {
        border-right: 0;
      }
    }
  }
}
.goods_info {
  margin: 50px auto;
  margin-bottom: 20px;
  min-height: 500px;
  width: $max-width * 1px;
  display: flex;
  padding-bottom: 50px;
}
.left {
  width: 560px;
  height: 560px;
  flex-shrink: 0;
}
.right {
  padding-top: 35px;
  padding-left: 30px;
  flex-grow: 1;
  & .info {
    margin-top: 10px;
    font-size: 15px;
  }
  & .m-t5 {
    font-size: 16px;
  }
  & .address {
    background: #fafafa;
    border: 1px solid #e0e0e0;
    padding: 30px 30px;
    margin-top: 20px;
    & > .iconfont {
      font-size: 16px;
      margin-right: 15px;
    }
    & > span {
      font-size: 15px;
      display: inline-block;
      margin-top: 4px;
    }
    & > .price {
      font-size: 26px;
      margin-top: 20px;
    }
  }
}
.version {
  & > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & > li {
      text-align: center;
      border: 1px solid #ccc;
      width: 49%;
      padding: 15px 0;
      cursor: pointer;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 200;
      color: #666;
      transition: all 0.3s;
      &:hover {
        border: 1px solid $paimary-color;
        color: $paimary-color;
      }
    }
    & .active {
      border: 1px solid $paimary-color;
      color: $paimary-color;
    }
  }
}
.tag {
  font-weight: 200;
  font-size: 23px;
  padding: 25px 0;
}
.btn {
  margin-top: 30px;
  .add {
    padding: 20px 100px;
    border: 1px solid $paimary-color;
    background: white;
    font-size: 20px;
    outline: none;
    margin-right: 10px;
    transition: all 0.4s;
    &:hover {
      background: $paimary-color;
      color: white;
    }
  }
  .like {
    padding: 20px 40px;
    border: 1px solid;
    background: rgb(145, 141, 141);
    font-size: 20px;
    color: white;
    outline: none;
    transition: all 0.4s;
    &:hover {
      background: #666;
      color: white;
    }
  }
}
</style>
