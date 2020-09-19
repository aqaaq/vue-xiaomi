<template>
  <div>
    <div class="main">
      <div class="top">
        <div class="left">
          <i class="right iconfont icon-right1"></i>
          <div class="text">
            <p class="info">订单提交成功！去付款咯～</p>
            <p>
              请在
              <span class="paimary-color">0 小时 {{ endTime }} 分</span> 内完成支付, 超时后将取消订单
            </p>
            <p
              v-show="!show"
            >收货信息：{{model.address.name}} {{model.address.phone}} {{model.address.first}} {{model.address.last}}</p>
          </div>
        </div>
        <div class="right">
          <p>
            应付总额:
            <span class="price">{{model.price}}元</span>
          </p>
          <span class="show" @click="changeShow">
            订单详情
            <i class="iconfont icon-down"></i>
          </span>
        </div>
        <div class="container" ref="container">
          <div class="box_" ref="box_">
            <div>
              <label>订单号:</label>
              <p>{{model._id}}</p>
            </div>
            <div>
              <label>收货信息:</label>
              <p>{{model.address.name}} {{model.address.phone}} {{model.address.first}} {{model.address.last}}</p>
            </div>
            <div>
              <label>商品名称:</label>
              <div>
                <p
                  v-for="(item,key) in model.item"
                  :key="key"
                >{{item.name}} {{item.size}} {{item.color}}</p>
              </div>
            </div>
            <div>
              <label>发票信息:</label>
              <p>电子普通发票 个人</p>
            </div>
          </div>
        </div>
      </div>

      <div class="buttom">
        <p class="title">选择以下支付方式付款</p>
        <strong class="pay_type">支付平台</strong>
        <div class="pay" @click="event">
          <img src="../assets/xm.jpg" data-val="小米支付" />
          <img src="../assets/wx.jpg" data-val="微信支付" />
          <img src="../assets/zx.jpg" data-val="在线支付" />
          <img src="../assets/zfb.jpg" data-val="支付宝支付" />
        </div>
      </div>
    </div>
    <div :class="{message_box:true,show:isShow}" @click.prevent="res(true)">
      <div :class="{_box:true,transform:isShow}">
        <p>{{payType}}成功！</p>
        <div>
          <button @click="res(true)" class="confirm">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String, required: true },
  },

  data() {
    return {
      payType: "",
      to: false,
      show: false,
      isShow: false,
      endTime: "",
      model: {
        address: {},
      },
    };
  },
  methods: {
    changeShow() {
      this.show = !this.show;
      if (this.show) {
        this.$refs.container.style.height =
          this.$refs.box_.offsetHeight + 25 + "px";
      } else {
        this.$refs.container.style.height = "0";
      }
    },
    async fetch() {
      //根据id 得到订单信息
      this.model = await this.$http.get(`orderById/${this.id}`);
      var time = this.model.endTime - Date.now();
      this.endTime = Math.floor(time / 60000);
    },
    event(ev) {
      if (ev.target.tagName == "IMG") {
        this.payType = ev.target.dataset.val;
        this.update().then(
          (data) => {
            console.log(data);
            this.isShow = !this.isShow;
            this.to = true;
          },
          () => {
            this.payType = "支付失败!";
            this.isShow = !this.isShow;
          }
        );
      }
    },
    res(falg) {
      this.isShow = false;
      if (falg && this.to) {
        this.to = "";
        return this.$router.replace("/home/order");
      }
    },
    update() {
      return this.$http.put("order/" + this.id, {
        payType: this.payType,
        pay: true,
      });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.main {
  margin: 50px auto;

  width: $max-width * 1px;
}
.top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 70px 50px;
  padding-bottom: 40px;
  color: #666;
  background: white;
  transition: height 0.5s;
}
.left {
  display: flex;
  align-items: flex-start;
  & .right {
    height: 80px;
    width: 80px;
    line-height: 80px;
    font-size: 80px;
    color: #83c44e;
    margin-right: 30px;
  }
  & .text {
    font-size: 15px;

    & > p {
      margin-bottom: 5px;
    }
    & > .info {
      margin-bottom: 10px;
      font-size: 28px;
    }
  }
}
.right {
  text-align: right;
  & .price {
    margin-left: 5px;
    margin-bottom: 10px;
    display: inline-block;
  }
}
.show {
  &:hover {
    color: #ff6700;
    cursor: pointer;
  }
}
.container {
  font-size: 15px;
  color: #666;
  background: white;
  padding-left: 110px;
  width: 100%;
  line-height: 2.5;
  overflow: hidden;
  height: 0;

  transition: height 0.5s;
  & > .box_ {
    padding-top: 25px;
    margin-top: 25px;
    border-top: 1px solid #ccc;
  }
  & > .box_ > div {
    display: flex;
    flex-wrap: wrap;
    & label {
      display: inline-block;
      width: 100px;
    }
  }
}
.price {
  font-size: 24px;
  color: #ff6700;
}
.buttom {
  margin-top: 50px;
  padding: 0 50px;
  padding-bottom: 30px;
  background: white;
  color: #424242;
  & .title {
    font-size: 18px;
    font-weight: 200px;
    padding: 30px 0;
    border-bottom: 1px solid #ccc;
  }
  & .pay_type {
    display: block;
    padding-top: 20px;
    color: #666;
    padding-bottom: 10px;
    font-size: 18px;
  }
  & .pay {
    padding: 10px 0;
    & > img {
      width: 180px;
      height: 60px;
      border: 1px solid #ccc;
      margin-right: 20px;
      cursor: pointer;
    }
    & :active {
      border: 1px solid #ff6700;
    }
  }
}
.transform {
  margin-top: -115px !important;
}
.show {
  height: 100% !important;
}
.message_box {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  background: rgba(#000000, 0.4);
  left: 0;
  top: 0;
  height: 0;
  overflow: hidden;
  & > ._box {
    position: absolute;
    width: 500px;
    background: white;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -155px;
    text-align: center;
    transition: margin-top 0.5s;
    & > p {
      padding: 50px 0;
      font-size: 25px;
      font-weight: 200;
    }
    & > div {
      background: #f5f5f5;
      padding: 20px 30px;
      & > .confirm {
        width: 200px;
        padding: 15px 0;
        color: white;
        outline: none;
        background: #ff6700;
        opacity: 0.8;
        border: 0;
        margin-right: 10px;
        &:hover {
          opacity: 1;
        }
      }
      & > .close_ {
        border: 0;
        width: 200px;
        outline: none;
        color: white;
        padding: 15px 0;
        background: #666;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>