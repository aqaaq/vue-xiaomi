import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var token = localStorage.getItem('token') || '';
var user = sessionStorage.getItem('user') || '';
var cartList = sessionStorage.getItem('cartList') || '';
if (cartList) {
  cartList = JSON.parse(cartList);
} else {
  cartList = [];
}
export default new Vuex.Store({
  state: {
    token,
    user,
    cartList,
    price: 0,
    check_num: 0,
    count: 0
  },
  mutations: {
    setUser(state, str) {
      state.user = str;
    },
    setCartList(state, str) {
      state.cartList = str
    },
    clear(state) {
      state.price = 0;
      state.check_num = 0;
      state.count = 0;
    },
    exit(state) {
      state.user = '';
      state.cartList = '';
      state.token = null;
      this.commit('clear');
      sessionStorage.clear();
      localStorage.setItem('token', '');
    },
    clearCartList(state) {
      var list = state.cartList;
      for (let i = 0; i < list.length; i++) {
        var val = list[i];
        if (val.select) {
          list.splice(i, 1);
          i--;
        }
      }
      state.cartList = list;
    },
    setToken(state, str) {
      state.token = str;
    }
    , deleteGoods(state, index) {
      state.cartList.splice(index, 1);
    }
  },
  getters: {
    user(state) {
      if (state.user) {
        return JSON.parse(state.user)
      }
      return state.user
    },
    // 将后端返回的数据稍微改动
    cartList_(state) {
      if (state.cartList) {
        state.check_num = 0;
        state.price = 0;
        state.count = 0;
        var list = state.cartList.map((val) => {
          var obj = {};
          var colorIndex = val.version,
            item = val.id.version,
            sizeIndex = val.size;
          obj.num = val.num;
          obj.select = val.select;
          obj.icon = val.id.icon;
          obj.name = val.id.name;
          obj.color = item[colorIndex].color || "";
          obj.price = item[colorIndex].size[sizeIndex].price;
          obj.id = val.id._id;
          if (item[colorIndex].size[sizeIndex]) {
            obj.size = item[colorIndex].size[sizeIndex].name;
          } else {
            obj.size = "";
          }
          obj.price_ = obj.num * obj.price;
          state.count += obj.num;
          if (obj.select) {
            state.check_num += obj.num;
            state.price += obj.num * obj.price;
          }
          return obj;
        });
        console.log('vuex state change!')
        return list
      } else {
        return []
      }
    },
    // 选中 物品数组
    selectVal(state, getters) {
      var arr = getters.cartList_.filter(currval => {
        if (currval.select) {
          return currval;
        }
      });
      return arr;
    }
  },
  actions: {
    change(state) {
      setTimeout(() => {
        state.commit('plus', '123');
      }, 1000)
    }
  },
  modules: {
  }
})
