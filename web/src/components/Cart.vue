<template>
  <div class="main">
    <div class="rule-box">
      <div v-if="list.length < 1" class="cart-empty">
        <div>
          <img src="../assets/cart-empty.png" />
        </div>
        <div class="hint">
          <p class="title">您的购物车还是空的！</p>
          <p>登录后将显示您之前加入的商品</p>
          <div class="btn">
            <router-link to="/login" tag="button" class="add paimary-color" v-show="!user">立即登录</router-link>
            <router-link to="/home/display" tag="button" class="like">马上去购物</router-link>
          </div>
        </div>
      </div>
      <div v-else class="cart-noempty">
        <div class="table_header border-bootom">
          <span class="pl">
            <input class="checkbox" type="checkbox" @change="allSelect" :checked="all_" />全选
          </span>
          <span class="pl">货品名称</span>
          <span class="pl">单价</span>
          <span class="pl">数量</span>
          <span class="pl">小计</span>
          <span class="pl">操作</span>
        </div>
        <div class="table_header _goods" v-for="(i,key) in list" :key="key">
          <span class="pl">
            <input class="checkbox" v-model="i.select" type="checkbox" @change="changeCheck(key)" />
            <label class="chose"></label>
          </span>
          <span class="box">
            <div class="img_box">
            <img class="goods_jpg" :src="i.icon" />
            </div>
            <span class="name">{{ i.name}}</span>
            &nbsp;
            <span>{{i.size}}</span>
            <span>{{i.color}}</span>
          </span>
          <span class="pl">{{i.price}}元</span>
          <span>
            <el-input-number v-model="i.num" :min="1" :max="10" @change="change(key)"></el-input-number>
          </span>
          <span class="pl paimary-color">{{i.price_}}元</span>
          <span class="pl line-height0">
            <span class="close" @click="removeKey = key;isShow=!isShow">
              {{key}}
              <i class="iconfont icon-closesearch"></i>
            </span>
          </span>
        </div>
        <div class="table_footer">
          <div class="numbers">
            <span class="goon">继续购物</span> |
            <span class="aaa">
              共
              <span>{{$store.state.count}}</span> 件物品,已选择
              <span>{{$store.state.check_num}}</span> 件
            </span>
          </div>
          <div class="paimary-color ds-flex">
            <span>合计：</span>
            <span class="price">{{$store.state.price}}元</span>
            <button @click="check" class="buy paimary-color">去结算</button>
          </div>
        </div>
      </div>
    </div>

    <div class="message_box" v-show="isShow" @click.prevent="res(false)">
      <div class="_box">
        <p>确定要删除吗？</p>
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
  name:'Cart',
  data() {
    return {
      //删除弹框
      isShow: false,
      //移除的key
      removeKey: 0,
      //购物车数据
      //全选按钮
      all: this.$store.state.check_num == this.$store.state.count,
    };
  },
  methods: {
    //根据 传入 falg判断 确认 或取消
    async res(falg) {
      this.isShow = false;
      if (falg) {
        //改变state 数据, 偷个懒 ，最好在 mutations中去修改数据
        this.$store.state.cartList.splice(this.removeKey, 1);
        this.Put().then(
          (data) => {
            //后端同步数据
            this.edit(data);
          },
          () => {
            this.$message.error("err");
          }
        );
      }
    },
    Put() {
      var id = this.$store.getters.user._id;
      return this.$http.put("/cart/" + id, { item: this.cartList });
    },
    //更新store 数据
    async fetch() {
      var id = this.$store.getters.user._id;
      return await this.$http.put("/cart/" + id);
    },
    //修改sessionStorage数据
    async edit(res) {
      sessionStorage.setItem("cartList", JSON.stringify(res));
    },
    async change(key) {
      this.cartList[key].num = this.list[key].num;
      this.Put();
      // this.edit(this.cartList);
    },
    changeCheck(key) {
      this.cartList[key].select = this.list[key].select;
      this.Put();
      // this.edit(this.cartList);
    },
    allSelect() {
      if (!this.all_) {
        this.all = true;
      } else {
        this.all = false;
      }
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].select = this.all;
        this.cartList[i].select = this.all;
      }
      this.Put();
      // this.edit(this.cartList);
    },
    check() {
      if (this.$store.state.check_num === 0) {
        return false;
      }
      this.$router.push("/mi/check-order");
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    list() {
      return this.$store.getters.cartList_;
    },
    all_() {
      return this.$store.state.check_num === this.$store.state.count;
    },
    cartList() {
      return this.$store.state.cartList;
    },
  },
  created() {
    console.log('Cart')
    if (!this.user) {
      return;
    }
    this.fetch().then((data) => {
      this.$store.commit("setCartList", data);
      this.edit(data);
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.main {
  min-width: $max-width * 1px;
  background: #f5f5f5;
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

.checkbox {
  width: 18px;
  height: 18px;
  margin-right: 15px;
  background: orangered;
  cursor: pointer;
}
.sign {
  > span {
    vertical-align: middle;
    margin: 3px;
    &:hover {
      color: $paimary-color;
      cursor: pointer;
    }
  }
}
.cart-empty {
  margin-top: 80px;
  padding: 30px 0;
  display: flex;
}

.hint {
  font-size: 20px;
  margin: 80px;
  color: #666;
  & > .title {
    font-size: 30px;
    margin-bottom: 5px;
    color: black;
  }
}
.btn {
  margin-top: 30px;
  .add {
    padding: 10px 50px;
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
    padding: 10px 40px;
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
.cart-noempty {
  margin: 50px 0;
  background: #f5f5f5;
  & .table_header {
    display: grid;
    grid-template-columns: 10% 43% 10% 17% 10% 10%;
    grid-template-rows: 70px;
    line-height: 70px;
    font-size: 18px;
    font-weight: 200;
    background: white;
    & > span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  & .table_footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    font-weight: 200;
    background: white;
    color: #666;
    & .numbers {
      margin-left: 25px;
      font-size: 16px;
      & .goon {
        margin-right: 10px;
        &:hover {
          color: $paimary-color;
          cursor: pointer;
        }
      }
      & .aaa {
        margin-left: 10px;
        span {
          color: $paimary-color;
        }
      }
    }
    & .price {
      font-size: 28px;
    }
  }
  & ._goods {
    display: grid;
    grid-template-rows: 100px;
    line-height: 100px;
    & .img_box{
      height: 80px;
      text-align: center;
      min-width: 120px;
      display: inline-block;
    }
    & .goods_jpg {
      width: auto;
      height: 80px;
      vertical-align: middle;
    }
  }
}
.pl {
  padding-left: 30px;
}
.close {
  display: inline-block;
  margin-top: 10px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  margin-top: 35px;
  cursor: pointer;
  & > .iconfont {
    font-size: 10px;
  }
}
.close:hover {
  border-radius: 50%;
  background: #b91c3f;
  color: white;
}
.line-height0 {
  line-height: 0;
}
.buy {
  height: 100%;
  padding: 0 80px;
  font-size: 18px;
  margin-left: 20px;
  background: $paimary-color;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
}
.message_box {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  background: rgba(#000000, 0.4);
  left: 0;
  top: 0;
  & > ._box {
    position: absolute;
    width: 500px;
    height: 220px;
    background: white;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -115px;
    text-align: center;
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