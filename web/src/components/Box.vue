<template>
  <div class="main">
    <div class="logo_box">
      <slot name="logo"> </slot>
    </div>
    <!-- 长条logo -->
    <div class="header">
      <span class="title">{{ title }}</span>
      <router-link
        tag="span"
        :to="'all/goods?keywords=' + keywords"
        class="more"
      >
        查看更多
        <i class="iconfont icon-ArrowCircleRight"></i>
      </router-link>
    </div>
    <div class="container">
      <div class="left">
        <slot name="left"> </slot>
      </div>
      <div class="right">
        <router-link
          tag="div"
          :to="'/home/details/' + item._id"
          class="right_box"
          v-for="(item, index) in ImgList"
          :key="index"
        >
          <div
            class="item box_shadow"
            :style="{ 'border-top': '2px solid' + getColor(index) }"
          >
            <img v-lazy="item.icon" />
            <p class="name over">{{ item.name }}</p>
            <p class="desc over">{{ item.desc }}</p>
            <p class="price">{{ item.version[0].size[0].price }}元</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String },
    imgList: { type: Array },
    keywords: { type: String },
  },
  data() {
    return {
      colorList: [
        "#E53A40",
        "#58C9B9",
        "#FFBC42",
        "#9055A2",
        "#7200da",
        "#8283a7",
        "#e11d74",
        "#dddddd",
      ],
    };
  },
  methods: {
    getColor(index) {
      return this.colorList[index % 8];
    },
  },
  computed: {
    ImgList() {
      return this.imgList.slice(0, 8);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.main {
  margin-top: 20px;
}
.logo_box {
  width: $max-width * 1px;
  margin: auto;
  & > img {
    width: 100%;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 30px;
  margin-bottom: 20px;
  .title {
    font-size: 25px;
    color: black;
    font-weight: 100;
  }
  & .more {
    font-size: 20px;
    font-weight: 200;
    cursor: pointer;
    .iconfont {
      color: #ccc;
      font-size: 20px;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
}
.container {
  display: flex;
}
.left {
  width: $left-width * 1px;
  flex-shrink: 0;
  & > img {
    width: 100%;
    display: block;
  }
}
.right {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
  & > .right_box {
    width: 25%;
    padding: 0 5px;
    & > .item {
      border-top: 1px solid red;
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: center;
      background: white;
      padding: 17px 0;
      height: 303px;
      & > p {
        margin-bottom: 15px;
        max-width: 80%;
      }
      & > img {
        height: 160px;
        max-width: 100%;
      }
      & .price {
        color: #ff6700;
      }
      & .name {
        font-size: 16px;
      }
      & .desc {
        font-size: 13px;

        color: #666;
      }
    }
  }
}
</style>
