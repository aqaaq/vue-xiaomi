<template>
  <div class="main">
    <div class="container">
      <div class="body_">
        <h4 class="title_">收货地址</h4>
        <div class="adress">
          <div
            :class="{item:true,active:key===activeId}"
            v-for="(item,key) in model.address"
            :key="key"
            @click="activeId = key"
          >
            <span class="name">{{item.name}}</span>
            <span class="phone">{{item.phone}}</span>
            <span class="adress">{{item.first}}</span>
            <span class="home">{{item.last}}</span>
            <span class="update" @click="update(item,key)">修改</span>
            <span class="update" @click="deleted(key)">删除</span>
          </div>
          <div class="add">
            <div @click="isShow=!isShow">
              <i class="iconfont icon-plus"></i>
              <br />
              <span>添加新地址</span>
            </div>
          </div>
        </div>
        <h4 class="title_">商品</h4>
        <div class="goods">
          <div class="goods_items" v-for="(item,key) in selectVal" :key="key">
            <div class="_box">
              <div class="img_box">
                <img v-lazy="item.icon" />
              </div>
              <span class="name">{{item.name}} {{item.size}} {{item.color}}</span>
            </div>
            <span class="name">{{item.price}} 元 x {{item.num}}</span>
            <span class="price">{{item.price * item.num}}元</span>
          </div>
        </div>
        <div class="ways">
          <h4 class="title_">配送方式</h4>
          <span class="text">包邮</span>
        </div>
        <div class="order_info">
          <div class="information">
            <p>
              <span>商品件数:</span>
              <span class="unit">{{this.$store.state.check_num}}</span>
            </p>
            <p>
              <span>商品总价:</span>
              <span class="unit">{{this.$store.state.price}}元</span>
            </p>
            <p>
              <span>活动优惠:</span>
              <span class="unit">-0元</span>
            </p>
            <p>
              <span>活动券抵扣:</span>
              <span class="unit">-0元</span>
            </p>
            <p>
              <span>运费:</span>
              <span class="unit">-0元</span>
            </p>
            <p>
              <span>应付总额:</span>
              <span class="unit price">{{this.$store.state.price}}元</span>
            </p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="check_address"></div>
        <div class="btn">
          <button class="goCart">返回购物车</button>
          <button class="buy" @click="buy">立即下单</button>
        </div>
      </div>
    </div>
    <div :class="{message_box:true,show:isShow}" @click.prevent="res(false)">
      <div @click.stop.prevent :class="{_box:true,transition:isShow}">
        <h4 class="title_ p-l-10 text-left">添加收货地址</h4>
        <div class="form_">
          <input class="text" v-model="name" type="text" placeholder="姓名" />
          <input class="text" v-model="phone" type="text" placeholder="手机号" />
          <div class="select">
            <el-select class="select_" placeholder="省" v-model="val">
              <el-option
                class="select"
                v-for="(item,key) in ads"
                :key="key"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <el-select class="select_" placeholder="市" v-model="val01">
              <el-option
                class="select"
                v-for="(item,key) in val01_"
                :key="key"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <el-select class="select_" placeholder="区" v-model="val02">
              <el-option
                class="select"
                v-for="(item,key) in val02_"
                :key="key"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
          <div class="info">
            <textarea class="info_" v-model="last" placeholder="详细地址" />
          </div>
          <div class="info">
            <input class="info_ height" v-model="info" placeholder="标签" />
          </div>
        </div>
        <div>
          <button @click="res(true)" class="confirm">确认</button>
          <button @click="res(false)" class="close_">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var ads = [
      {
        name: "湖北",
        children: [
          {
            name: "武汉市",
            children: [
              { name: "江汉区" },
              { name: "新洲区" },
              { name: "洪山区" },
              { name: "江夏区" },
            ],
          },
        ],
      },
      {
        name: "北京",
        children: [
          {
            name: "北京市",
            children: [
              { name: "东城区" },
              { name: "西城区" },
              { name: "朝阳区" },
            ],
          },
        ],
      },
      {
        name: "广东",
        children: [
          {
            name: "广州市",
            children: [
              {
                name: "白云区",
              },
              {
                name: "天河区",
              },
              {
                name: "越秀区",
              },
            ],
          },
          {
            name: "佛山市",
            children: [{ name: "顺德区" }, { name: "三水区" }],
          },
        ],
      },
    ];
    var map01 = new Map();
    ads.map((val) => map01.set(val.name, val.children));
    var map02 = new Map();
    ads.map((val) => {
      val.children.map((value) => {
        map02.set(value.name, value.children);
      });
    });
    return {
      selectVal: this.$store.getters.selectVal,
      activeId: 0,
      isShow: false,
      val: "",
      val01: "",
      val02: "",
      ads: ads,
      last: "",
      name: "",
      phone: "",
      info: "",
      map01,
      map02,
      updateKey: "",
      model: {
        _id: "",
        address: [
          {
            name: "123213123",
            phone: "213213213",
            first: "北京 北京区 朝阳区",
            last: "213213213",
            info: "123213213213",
          },
        ],
      },
    };
  },
  methods: {
    res(falg) {
      //确认按钮
      if (falg) {
        //判断点击的是否为修改按钮
        if (this.updateKey !== "") {
          //修改地址 并将 数据清空
          this.model.address[this.updateKey] = new this.Address(this);
        } else {
          //新建地址
          if (
            !this.val ||
            !this.val01 ||
            !this.val02 ||
            !this.last ||
            !this.phone
          ) {
            return confirm("填写完整地址");
          }
          this.model.address.push(new this.Address(this));
        }
        //后端修改数据
        this.modify();
      }
      //将所有数据清空
      this.Address(this);
      //关闭窗口
      this.isShow = false;
    },
    Address(that, key) {
      this.first = that.val + " " + that.val01 + " " + that.val02;
      this.last = that.last;
      this.name = that.name;
      this.phone = that.phone;
      if (!key) {
        that.val = that.val01 = that.val02 = that.last = that.name = that.phone =
          "";
        that.first = "";
        that.updateKey = "";
        that.info = "";
      }
    },
    update(that, key) {
      var str = that.first.split(" ");
      this.val = str[0];
      this.val01 = str[1];
      this.val02 = str[2];
      this.first = that.first;
      this.phone = that.phone;
      this.last = that.last;
      this.name = that.name;
      this.updateKey = key;
      this.isShow = !this.isShow;
    },
    async modify() {
      await this.$http.post("adress", this.model);
    },
    async fetch() {
      this.model = await this.$http.get("users/" + this.user._id);
    },
    deleted(key) {
      this.model.address.splice(key, 1);
      this.modify();
    },
    //创建订单
    async buy() {
      //新建一个订单
      const order = new this.Order(this);
      //地址不能为空
      if (!order.address) {
        return confirm("填写地址！");
      }
      console.log(order.address);
      //添加订单过期时间
      order.endTime = Date.now() + 600000; //10分钟
      //将已选中的物品 删除
      this.$store.commit("clearCartList");
      //发送请求保存 数据
      var id = this.user._id;
      var res = await this.$http.put("/cart/" + id, { item: this.cartList });
      //本地储存 结果
      sessionStorage.setItem("cartList", JSON.stringify(res));
      this.$store.commit("setCartList", res);
      //更新 vux state
      const data = await this.$http.post("order", order);
      //服务端添加失败时错误时，
      if (!data) {
        return this.$message.error("错误！");
      }
      this.$router.replace("/mi/pay/" + data._id);
    },
    Order(that) {
      this.user = that.user._id;
      this.address = that.check_address;
      this.item = that.selectVal;
      this.price = that.$store.state.price;
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },

    val01_() {
      return this.map01.get(this.val);
    },
    val02_() {
      return this.map02.get(this.val01);
    },
    check_address() {
      if (this.activeId !== "" && this.model.address.length > 0) {
        return this.model.address[this.activeId];
      } else {
        return "";
      }
    },
    cartList() {
      return this.$store.state.cartList;
    },
  },
  watch: {
    val(newVal, oldVal) {
      if (oldVal) {
        this.val01 = this.val02 = "";
      }
    },
  },
  created() {
    this.model._id = this.user._id;
    if (!this.user._id) {
      return this.$router.push("404");
    }
    this.fetch();
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.main {
  min-width: $max-width * 1px;
  background: $main-color;
}
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
.title_ {
  font-size: 25px;
  font-weight: 200;
}
.ways {
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #ccc;
  & .text {
    margin-left: 50px;
    color: #ff6700;
    font-size: 14px;
  }
}
.container {
  background: $main-color;
  padding: 50px 0;
  & > .body_ {
    width: $max-width * 1px;
    background: white;
    height: 100%;
    margin: auto;
    padding: 30px 20px;
    padding-bottom: 0;
    & > .adress {
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
      & > .item {
        width: 270px;
        height: 180px;
        border: 1px solid #ccc;
        padding: 15px 20px;
        display: flex;
        flex-direction: column;
        margin-right: 15px;
        margin-bottom: 15px;
        & > .name {
          font-size: 20px;
          margin-bottom: 10px;
          color: black;
        }
        & > span {
          margin-top: 3px;
          color: #666;
          font-size: 15px;
        }
        & > .home {
          word-break: break-all;
        }
        &:hover > .update {
          display: inline-block;
          cursor: pointer;
        }
        & > .update {
          color: #ff6700;
          align-self: flex-end;
          justify-self: flex-end;
          display: none;
          &:hover {
            display: inline-block;
            cursor: pointer;
          }
        }
      }
      & > .add {
        width: 270px;
        height: 180px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #ccc;
        &:hover {
          color: #666;
        }
        & .iconfont {
          font-size: 30px;
          margin-bottom: 5px;
          cursor: pointer;
        }
      }
    }
    & > .goods {
      padding: 30px 0;
      border-bottom: 1px solid #ccc;
      & > .goods_items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & ._box {
          display: flex;
          align-items: center;
          width: 50%;
        }
        & .img_box {
          width: 120px;
          text-align: center;
        }
        & img {
          height: 80px;
        }
        & .name {
          font-size: 17px;
          font-weight: 200;
          margin-left: 10px;
          color: rgb(78, 77, 77);
        }
        & > .price {
          color: #ff6700;
          font-size: 17px;
          font-weight: 200;
          margin-right: 60px;
        }
      }
    }
  }
}
.active {
  border: 1px solid #ff6700 !important;
}
.order_info {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  & .information {
    width: 250px;
    padding: 20px 0px;
    font-size: 18px;
    margin-right: 60px;
    font-weight: 200;
    & > p {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.unit {
  color: #ff6700;
}
.footer {
  width: $max-width * 1px;
  border-top: 1px solid #ccc;
  margin: auto;
  background: white;
  &::after {
    content: "";
    clear: both;
    display: block;
  }
}
.btn {
  padding: 20px 30px;
  float: right;
  margin-right: 45px;
  & > button {
    padding: 10px 60px;
    border: 0;
    outline: none;
    font-size: 16px;
    cursor: pointer;
  }
}
.buy {
  padding: 10px 20px;
  background: #ff6700;
  color: white;
  margin-left: 20px;
}
.transition {
  transform: translate(-50%, -50%) !important;
}
.show {
  height: 100% !important;
}
.message_box {
  width: 100%;
  height: 0;
  overflow: hidden;
  position: fixed;
  z-index: 100;
  background: rgba(#000000, 0.4);
  left: 0;
  top: 0;
  & > ._box {
    &::before {
      display: block;
      content: "";
      margin-top: 20px;
    }
    position: absolute;
    width: 700px;
    background: #f5f5f5;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transition: all 0.5s;
    transform: translate(-50%, -60%);
    text-align: center;
    & > .form_ {
      display: flex;
      padding: 10px;
      background: white;
      justify-content: space-between;
      flex-wrap: wrap;
      & .text {
        width: 48%;
        padding: 13px;
        border: 1px solid #ccc;
        outline: none;
        &:focus {
          border: 1px solid #ff6700;
        }
      }
      & .select {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        & .select_ {
          width: 32%;
        }
      }
      & .info {
        width: 100%;
        margin-top: 10px;
        font-size: 18px;
        & .info_ {
          width: 100%;
          height: 80px;
          font-size: 18px;
          outline: none;
          border: 1px solid #ccc;
          padding: 5px 10px;
        }
        & > .height {
          height: 50px;
          font-weight: 200;
        }
      }
    }
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
// .select {
//   text-indent: 10px;
// }
</style>