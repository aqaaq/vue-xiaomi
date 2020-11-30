<template>
  <div>
    <div class="logo">
      <slot name="logo"></slot>
    </div>
    <!-- 长条logo -->
    <div class="header">
      <span class="title">{{ title }}</span>
      <p v-if="arr.length > 0">
        <span
          @mouseover="index = key"
          :class="{ active: index === key }"
          v-for="(item, key) in arr"
          :key="key"
          >{{ item.name }}</span
        >
      </p>
    </div>

    <!-- 左侧盒子 -->
    <div class="box">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="right" v-if="currVal">
        <router-link
          tag="div"
          :to="`/home/details/${i._id}`"
          class="right_box _box box_shadow"
          v-for="(i, key) in currVal.slice(0, 7)"
          :key="key"
        >
          <img v-lazy="i.icon" />
          <p class="name over">{{ i.name }}</p>
          <p class="info over">{{ i.desc }}</p>
          <p class="price">{{ i.version[0].size[0].price }}元</p>
        </router-link>
        <div class="right_box bg-gary _last">
          <router-link
            tag="div"
            :to="`/home/details/${currVal[7]._id}`"
            class="last box_shadow"
            v-if="currVal[7]"
          >
            <div>
              <p class="naem">{{ currVal[7].name }}</p>
              <span>{{ currVal[7].version[0].size[0].price }}</span>
            </div>
            <div>
              <img v-lazy="currVal[7].icon" />
            </div>
          </router-link>
          <router-link
            tag="div"
            class="last box_shadow"
            :to="`all/goods?keywords=${keywords}`"
          >
            <div v-if="arr[0]">
              <p>浏览更多</p>
              <span>{{ arr[index].name }}</span>
            </div>
            <div>
              <i class="iconfont icon-ArrowCircleRight"></i>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    arr: { type: Array, required: true },
    title: { type: String, required: true },
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    currVal() {
      if (this.arr.length > 0) {
        console.log(this.arr[this.index]);
        return this.arr[this.index].newList;
      }
      return [];
    },
    keywords() {
      if (!this.arr[this.index]) {
        return;
      } else {
        return this.arr[this.index].name;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.logo {
  margin-top: 30px;
  & > img {
    width: 100%;
    height: auto;
  }
}
.box {
  width: 100%;
  padding-bottom: 30px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 30px;
  margin-bottom: 10px;
  .title {
    font-size: 25px;
    color: black;
    font-weight: 100;
  }
  & > p {
    line-height: 40px;
    & > span {
      font-size: 17px;
      margin-left: 30px;
      padding-bottom: 5px;
      border-bottom: 2px solid $main-color;
      cursor: pointer;
    }
  }
  .active {
    border-bottom: 2px solid $paimary-color;
    color: $paimary-color;
  }
}
.box {
  display: flex;
}
.left {
  width: $left-width * 1px;
  & img {
    width: 100%;
    height: 300px;
    display: block;
  }
  & > ._box {
    margin: 0;
    &:last-child {
      margin-top: 10px;
    }
  }
}
.right {
  flex-grow: 1;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  display: -ms-grid;
  -ms-grid-columns: 200px 200px 200px 200px;
  -ms-grid-rows: 500px 500px;
}
._box {
  width: $left-width * 1px;
  height: 300px;
  margin-left: 10px;
  text-align: center;
  background: white;
  font-size: 20px;
  color: #666;
}
.right_box {
  padding-top: 30px;
  text-align: center;
  background: white;
  font-size: 20px;
  color: #666;
  padding-top: 20px;
  &:nth-child(n + 5) {
    margin-top: 5px;
  }
  & > img {
    max-width: 100%;
    height: 160px;
  }
  & .name {
    font-size: 14px;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .info {
    font-size: 12px;
    margin-top: 10px;
    color: #666;
  }
  & .price {
    padding: 12px 0;
    color: $paimary-color;
    font-size: 15px;
  }
}
.box_shadow {
  transition: 0.3s linear;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
}
._last {
  padding-top: 0;
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.last {
  display: grid;
  grid-template-rows: 143px;
  grid-template-columns: 135px 100px;
  text-align: center;
  align-items: center;
  background: white;
  & > div > p {
    font-size: 14px;
    padding-left: 10px;
  }
  & span {
    font-size: 14px;
  }
  & .iconfont {
    color: $paimary-color;
    font-size: 50px;
  }
  & img {
    width: 80px;
    height: 80px;
  }
}
</style>
