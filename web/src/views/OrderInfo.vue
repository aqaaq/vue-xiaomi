<template>
  <div class="box">
    <div class="main">
      <h3 class="title">订单详情</h3>
      <div class="odd">
        <p class="order_num">订单号：5200828892501238</p>
        <div class="btn_list" v-if="!close">
          <div v-if="!model.pay">
            <button @click="update">取消订单</button>
            <router-link class="pay_button" tag="button" :to="`/mi/pay/${model._id}`">立即付款</router-link>
          </div>
          <router-link v-else class="pay_button" tag="button" to>申请售后</router-link>
        </div>
      </div>
      <div class="box_">
        <p class="state color-666" v-if="close">已关闭</p>
        <p class="state" v-else>{{model.pay?'已付款':'等待付款'}}</p>
        <div class="progress">
          <span :class="{first:true,on:stateId >= 0,active:stateId ===0}">下单</span>
          <span :class="{on:stateId > 1,active:stateId === 1}">付款</span>
          <span :class="{on:stateId >= 2,active:stateId === 2}">配货</span>
          <span>出库</span>
          <span>交易成功</span>
        </div>
        <div style="margin-top:80px">
          <div class="good_list" v-for="(item,key) in model.item" :key="key">
            <div class="img_box">
              <img v-lazy="item.icon" />
            </div>
            <p class="goods">{{item.name}} {{item.size}} {{item.color}}</p>
            <p>{{item.price}}元 * {{item.num}}</p>
          </div>
        </div>
      </div>
      <div class="box_">
        <p class="state color-666">收货信息</p>
        <div class="adress_info">
          <p>
            <strong>姓名：</strong>
            <span>{{model.address.name}}</span>
          </p>
          <p>
            <strong>联系方式：</strong>
            <span>{{model.address.phone}}</span>
          </p>
          <p>
            <strong>收货地址：</strong>
            <span>{{model.address.first}} {{model.address.last}}</span>
          </p>
        </div>
      </div>
      <div class="box_">
        <p class="state color-666">支付方式</p>
        <p class="payType">
          <strong class="strong">支付方式:</strong>
          {{model.payType||'在线支付'}}
        </p>
      </div>
      <div class="price">
        <p>
          <label>商品总价:</label>
          <span>{{model.price}}元</span>
        </p>
        <p>
          <label>运费:</label>
          <span>0元</span>
        </p>
        <p>
          <label>应付金额:</label>
          <span class="max">{{model.price}}元</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'OrderInfo',
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      stateId: 0,
      close: false,
      model: {
        address: {},
      },
    };
  },
  methods: {
    async fetch() {
      this.model = await this.$http.get("orderById/" + this.id);
      if (!this.model.pay && this.model.endTime < Date.now()) {
        this.close = true;
      }
      if (this.model.pay) {
        this.stateId = 2;
      } else {
        this.stateId = 0;
      }
    },
    async update() {
      this.model.endTime = 1;
      var data = await this.$http.put("order/" + this.id, this.model);
      if(data){
        this.$message('订单已关闭');
        this.close = true;
      }
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.box {
  background: #f5f5f5;
  border: 1px solid white;
}
.main {
  width: $max-width * 1px;
  margin: 40px auto;
  background: white;
  padding: 30px;
  padding-bottom: 0;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
}
.title {
  font-size: 30px;
  color: #666;
  font-weight: 400;
}
.odd {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid #ccc;
  & > .order_num {
    font-size: 18px;
  }
}
.btn_list {
  & .pay_button {
    background: #ff6700;
    border: 1px solid #ff6700;
    color: white;
  }
  & button {
    background: white;
    outline: none;
    border: 0;
    padding: 10px 45px;
    margin-left: 15px;
    font-size: 12px;
    border: 1px solid #ccc;
    color: #666;
    cursor: pointer;
  }
}
.state {
  font-size: 18px;
  margin: 20px 0;
  color: #ff6700;
}
.progress {
  background: #f5f5f5;
  text-align: center;
  border-radius: 20px;
  & .first {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  & .on {
    background: #83c44e;
    color: white;
  }
  & .active {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  & span {
    display: inline-block;
    width: 20%;
    padding: 5px 0;
  }
}
.good_list {
  display: flex;
  align-items: center;
  & .img_box {
    width: 130px;
    text-align: center;
    & > img {
      height: 80px;
    }
  }
  & .goods {
    width: 500px;
  }
}
.box_ {
  border-bottom: 1px solid #ccc;
  padding-bottom: 30px;
}
.adress_info {
  & p {
    color: #666;
    padding: 5px 0;
  }
  & strong {
    display: inline-block;
    width: 100px;
    color: #666;
  }
}
.payType {
  color: #666;
  margin: 30px 0;
  font-size: 16px;
  & .strong {
    display: inline-block;

    width: 100px;
  }
}
.price {
  float: right;
  margin-right: 40px;
  width: 300px;
  font-size: 16px;
  color: #666;
  padding: 10px 0;

  & > p {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    & > label {
      display: inline-block;
      width: 120px;
      text-align: right;
    }
    & > span {
      color: #ff6700;
      line-height: 1;
    }
  }
}
.max {
  font-size: 28px;
}
</style>