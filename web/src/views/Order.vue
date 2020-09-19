<template>
  <div class="box">
    <div class="main">
      <h3 class="title">我的订单</h3>
      <div class="nav">
        <ul class="type-none">
          <li @click="changed(0)" :class="{active:activeId===0}">全部有效订单</li>
          <li @click="changed(1)" :class="{active:activeId===1}">待支付</li>
          <li>待收货</li>
          <li>订单回收站</li>
        </ul>
        <div class="header_inout">
          <input type="text" />
          <button>
            <i class="iconfont icon-search"></i>
          </button>
        </div>
      </div>
      <div
        :class="{order_body:true,
        pay:!item.pay&&!item.close,
        success:item.pay,
        close:item.close}"
        v-for="(item,key) in model_"
        :key="key"
      >
        <div class="order_title">
          <p class="state color-666" v-if="item.close">已关闭</p>
          <div v-else>
            <p class="state" v-show="item.pay">已付款</p>
            <p class="state" v-show="!item.pay">等待付款</p>
          </div>
          <div class="information">
            <div class="left">
              <span>{{item.createdAt | timer}}</span>
              <span>{{item.address.name}}</span>
              <span>订单号：{{item._id}}</span>
              <span>{{item.payType||'待支付'}}</span>
            </div>
            <div>
              <span v-show="item.pay">实付金额:</span>
              <span v-show="!item.pay">应付金额:</span>
              <span class="price paimary-color">{{item.price}}.00</span>元
            </div>
          </div>
        </div>
        <div class="goods_container">
          <div class="goods_list" v-for="(item01,key01) in item.item" :key="key01">
            <div class="item">
              <div class="img_box">
                <img v-lazy="item01.icon" />
              </div>
              <div class="name">
                <p>{{item01.name}} {{item01.size}} {{item01.color}}</p>
                <p>{{item01.price}}元 × {{item01.num}}</p>
              </div>
            </div>
          </div>
          <div class="btn_list">
            <router-link
              class="pay_button"
              tag="button"
              v-if="!item.close&&!item.pay"
              :to="`/mi/pay/${item._id}`"
            >立即付款</router-link>
            <router-link tag="button" :to="`/home/order/info/${item._id}`">订单详情</router-link>
          </div>
        </div>
      </div>
      <div style="text-align:center">
        <el-pagination
          style="margin-top:20px"
          @current-change="change"
          background
          layout="prev, pager, next"
          :total="list[activeId].length * 10"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      activeId: 0,
      endTime: "",
      showId: 0,
      list: [[], []],
    };
  },
  filters: {
    timer(val) {
      var date = new Date(val);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var day = date.getDate();
      day = day < 10 ? "0" + day : day;
      var hours = date.getHours();
      hours = hours < 10 ? "0" + hours : hours;
      var min = date.getMinutes();
      min = min < 10 ? "0" + min : min;
      var str = year + "年" + month + "月" + day + "日" + hours + ":" + min;
      return str;
    },
  },
  methods: {
    async fetch() {
      var res = await this.$http.get("/order/" + this.$store.getters.user._id);
      this.model = res;
      var now = Date.now();
      var payList = [];
      res.map((val) => {
        if (!val.pay) {
          val.close = val.endTime <= now;
          if (!val.close && !val.pay) {
            payList.push(val);
          }
        } else {
          val.close = false;
        }
      });
      var list = [];
      var list01 = [];
      for (let i = 0; i < res.length; i++) {
        list.push(res.slice(i, i + 5));
        if (i < payList.length) {
          list01.push(payList.slice(i, i + 5));
        }
        i += 4;
      }
      this.list = [list, list01];
    },
    change(key) {
      this.showId = key - 1;
    },
    //订单类型改变
    changed(key) {
      this.activeId = key;
      this.showId = 0;
    },
  },
  computed: {
    model_() {
      return this.list[this.activeId][this.showId];
    },
  },
  created() {
    if (!this.$store.getters.user) {
      this.$router.replace("/home/display");
    }
    this.fetch();
  },
  activated() {
    console.log("activated");
    if (!this.$store.getters.user) {
      this.$router.replace("/home/display");
    }
    this.fetch();
  },
  destroyed() {
    console.log('destroyed!')
    document.documentElement.scrollTop = 0;
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.box {
  background: $main-color;
  padding-bottom: 30px;
  padding-top: 50px;
}
.main {
  width: $max-width * 1px;
  margin: 0 auto;
  background: white;
  padding: 30px;
}
.title {
  font-size: 30px;
  color: #666;
  font-weight: 400;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  .active {
    color: $paimary-color;
  }
  ul {
    display: flex;
    font-size: 18px;
    font-size: 200;
    padding: 10px 0;
    & > li {
      cursor: pointer;
      transition: 0.5s;
      padding: 0 20px;
      border-right: 1px solid #ccc;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
        border-right: 0;
      }
    }
  }
}
.pay {
  border: 1px solid #ff6700 !important;
  & > .order_title {
    background: #fffaf7 !important;
    border-bottom: 1px solid rgba(#ff6700, 0.3) !important;
  }
}
.success {
  border: 1px solid #83c44e !important;
  & .order_title {
    background: #f1faf1 !important ;
    border-bottom: 1px solid rgba(#83c44e, 0.3) !important;
    & .state {
      color: #83c44e !important;
    }
  }
  & .price {
    color: #83c44e !important;
  }
}
.close {
  border: 1px solid #ccc !important;
  & .order_title {
    background: #f8f8f8 !important;
    border-bottom: 1px solid rgba(#ccc, 0.3) !important;
    & .price {
      color: #666 !important;
    }
  }
}
.order_body {
  width: 100%;
  border: 1px solid #666;
  position: relative;
  // height: 500px;
  margin-bottom: 20px;
  & .order_title {
    padding: 20px 20px;
    border-bottom: 1px solid #ccc;
    & .state {
      font-size: 24px;
      font-weight: 400;
      color: #ff6700;
    }

    & .information {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      padding: 10px 0;
      & > .left > span {
        padding: 0 18px;
        font-size: 16px;
        border-right: 1px solid #ccc;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: 0;
          padding-right: 0;
        }
      }
      & .price {
        font-size: 25px;
        margin: 0 5px;
      }
    }
  }
}
.goods_container {
  position: relative;
  & > .btn_list {
    position: absolute;
    top: 15px;
    font-weight: 400;
    right: 20px;
    & > .pay_button {
      background: #ff6700;
      border: 1px solid #ff6700;
      color: white;
    }
    & > button {
      background: white;
      outline: none;
      border: 0;
      display: block;
      padding: 7px 45px;
      margin-bottom: 13px;
      font-size: 12px;
      border: 1px solid #ccc;
      color: #666;
      cursor: pointer;
    }
  }
}
.goods_list {
  padding: 20px 20px;
  & > .item {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: rgb(44, 43, 43);
    & > .img_box {
      width: 120px;
      text-align: center;
      & > img {
        height: 80px;
        margin-right: 20px;
      }
    }
    & .name {
      p {
        margin-top: 3px;
      }
    }
  }
}
.header_inout {
  display: flex;
  margin-left: 30px;
  input {
    height: 48px;
    width: 223px;
    border: 1px solid #ccc;
    font-size: 14px;
    outline: none;
    text-indent: 5px;
  }
  input:focus {
    border: 1px solid $paimary-color;
  }
  input:focus ~ button {
    border: 1px solid $paimary-color;
    border-left: none;
  }
  button {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-left: none;
    background: white;
    outline: none;
  }
}
</style>

