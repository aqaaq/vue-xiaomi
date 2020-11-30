<template>
  <div class="box">
    <div class="box_left">
      <ul class="type-none">
        <li v-for="(item,key) in CategoryList" :key="key">
          {{item.name}}
          <i class="iconfont icon-you"></i>
          <div class="children-list" :style="{width:25 * Math.ceil(item.newList.length/6)+'%'}">
            <ul>
              <router-link
                tag="li"
                :to="`/home/details/${item01._id}`"
                class="item"
                v-for="(item01,key01) in item.newList"
                :key="key01">
                <div class="img_box">
                  <img v-lazy="item01.icon" />
                </div>
                <span>{{item01.name}}</span>
              </router-link>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="box_right">
      <swiper :imgList="imgList" :open="true" :timeout="4000" :left="235" />
    </div>
  </div>
</template>
<script>
import Swiper from "./Swiper.vue";
export default {
  props: {
    imgList: { type: Array, require: true },
    CategoryList: { type: Array, require: true },
  },
  components: {
    Swiper,
  },
  data() {
    return {
      size: 6,
    };
  }
};
</script>
<style lang="scss">
@import "../style/common.scss";
.box {
  display: flex;
  position: relative;
}
.box_left {
  width: 235px;
  padding: 10px 0;
  z-index: 3;
  background: rgba(#000000, 0.3);
  & > ul > li {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    color: #fff;
    &:hover {
      background: $paimary-color;
    }
    &:hover > .children-list {
      display: block;
    }
    .children-list {
      position: absolute;
      width: ($max-width - $left-width) * 1px;
      top: 0;
      left: 235px;
      height: 100%;
      display: none;
      color: black;
      & > ul {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 100%;
        background: white;
        border: 1px solid #ccc;
      }
      & .item {
        width: ($max-width - 233) * 1/4 * 1px;
        display: flex;
        align-items: center;
        padding: 18px 15px;
        & .img_box{
          min-width: 60px;
          text-align: center;
        }
        & img {
          height: 40px;
          max-width: 60px;
        }
        & span {
          margin-left: 10px;
        }
        &:hover {
          color: $paimary-color;
          cursor: pointer;
        }
      }
    }
  }
}
.box_right {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  height: 460px;
  width: 100%;
}
</style>