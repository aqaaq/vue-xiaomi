<template>
  <div class="main_box">
    <!-- header -->
    <div class="header">
      <!-- logo -->
      <div class="header_logo">
        <div class="logo">
          <router-link
            tag="div"
            to="/home/display"
            class="logo-home"
          ></router-link>
        </div>
        <img v-if="$route.path === '/home/display'" src="../assets/logo.gif" />
      </div>
      <!-- tarbar -->
      <slot name="tarbar">
        <div class="tarbar">
          <ul class="type-none nav header-nav">
            <li
              v-for="(item, key) in model"
              :key="key"
              @mouseover="chageTabbarChildren(item)"
            >
              {{ item.name }}
            </li>
            <li>服务</li>
            <li>社区</li>
            <div class="header-nav-children">
              <div class="container">
                <!-- {{model}} -->
                <router-link
                  tag="div"
                  :to="`/home/details/${item01._id}`"
                  v-for="(item01, index02) in tabbarChildren.newList"
                  :key="index02"
                >
                  <img v-lazy="item01.icon" />
                  <p class="name">{{ item01.name }}</p>
                  <p class="price">{{ item01.version[0].size[0].price }}元</p>
                </router-link>
              </div>
            </div>
          </ul>
        </div>
        <!-- input -->
        <div class="header_inout">
          <input
            type="text"
            @keyup.enter="sreach"
            placeholder="手机"
            v-model="keywords"
          />
          <button @click="sreach">
            <i class="iconfont icon-search"></i>
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // navShow: { type: Boolean, default: true },
    model: { type: Array },
  },
  data() {
    return {
      tabbarChildren: {},
      keywords: "",
    };
  },
  methods: {
    chageTabbarChildren(item) {
      this.tabbarChildren = item;
      console.log(this.tabbarChildren);
    },
    async sreach() {
      this.$router.push("/home/all/goods?keywords=" + this.keywords.trim());
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.main_box {
  width: 1226px;
  margin: auto;
  .header {
    height: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_logo {
      display: flex;
    }
    .logo {
      background: #ff6700;
      padding: 5px;
      margin-right: 10px;
      .logo-home {
        position: relative;
        width: 50px;
        height: 50px;
        overflow: hidden;
      }
      .logo-home:hover::before {
        left: 0;
      }
      .logo-home:hover::after {
        left: 50px;
      }
      .logo-home::before {
        content: "";
        display: block;
        background: url("../assets/mi-home.png") no-repeat top center;
        background-size: 50px 50px;
        width: 50px;
        height: 50px;
        transition: 0.3s linear;
        position: absolute;
        left: -50px;
      }
      .logo-home::after {
        content: "";
        display: block;
        background: url("../assets/mi-logo.png") no-repeat top center;
        background-size: 50px 50px;
        width: 50px;
        height: 50px;
        position: absolute;
        left: 0;
        transition: 0.3s linear;
      }
    }
  }
}
.tarbar {
  flex-grow: 1;
  height: 100%;
  margin-right: 10px;
}
@media screen and (max-width: 650px) {
  .header-nav {
    & > li {
      &:hover {
        cursor: none !important;
      }
    }
  }
}
.header-nav {
  height: 100%;
  justify-content: space-around;
  color: #333;
  & > li {
    font-size: 16px;
    line-height: 110px;
    flex-grow: 1;
    text-align: center;
    &:hover {
      cursor: pointer;
      color: $paimary-color;
    }
    &:hover ~ .header-nav-children {
      height: 215px;
      border: 1px solid #ccc;
      border-bottom: none;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
  }
  .header-nav-children:hover {
    height: 215px;
    border: 1px solid #ccc;
    border-bottom: none;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
}
.header_inout {
  display: flex;
  margin-left: 30px;
  input {
    height: 48px;
    line-height: 48px;
    width: 223px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    text-indent: 20px;
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
.header-nav-children {
  width: 100%;
  line-height: 1.5;
  position: absolute;
  z-index: 40;
  left: 0;
  border: 0;
  top: 160px;
  background: white;
  height: 0;
  overflow: hidden;
  transition: height 0.3s linear, box-shadow 0.2s linear 0.3s;
  & .container {
    display: flex;
    width: $max-width * 1px;
    margin: auto;
    & > div {
      width: 16.3%;
      text-align: center;
      color: black;
      padding: 25px 0px;
      position: relative;
      & img {
        height: 110px;
        max-width: 200px;
      }
      & .price {
        color: $paimary-color;
      }
      & .name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0 25px;
      }
      &::after {
        content: "";
        height: 120px;
        width: 1px;
        display: block;
        position: absolute;
        right: 0;
        top: 25px;
        background: #ccc;
        transform: scaleX(0.5);
      }
      &:last-child::after {
        width: 0;
      }
    }
  }
}
.container_box {
  width: $max-width * 1px;
  padding-top: 10px;
  margin: auto;
}
</style>