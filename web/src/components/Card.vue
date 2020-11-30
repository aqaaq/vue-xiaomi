<template>
  <div class="main">
    <slot name="logo"></slot>
    <!-- 长条logo -->
    <div class="header">
      <span class="title">{{title}}</span>
      <span>
        <i class="iconfont icon-tubiaozhizuomoban" @click="back"></i>
        <i class="iconfont icon-you" @click="go"></i>
      </span>
    </div>
    <!-- 标题,轮播区域 -->
    <div class="main_box">
      <div class="left">
        <div class="box-left _box">
          <h4>14:00 &nbsp; 场</h4>
          <img src="../assets/down.jpg" />
          <p>距离结束还有</p>
          <span class="time">
            <i>00</i> :
            <i>04</i> :
            <i>19</i>
          </span>
        </div>
      </div>
      <!-- left -->
      <div class="right">
        <div ref="container" class="right_container" :style="{width:container_width*100+'%'}">
          <!-- 默认 -->
          <div
            class="slider"
            :style="{width:1/container_width*100+'%','flex-wrap':wrap?'wrap':'nowrap'}"
          >
            <div class="right_box _box alingn-start" v-for="(item,key) in Data" :key="key">
              <router-link tag="div"
              :style="{'border-top':'1px solid'+colorList[key%8]}"
               :to="`/home/details/${item._id}`" class="toolbar">
                <img v-lazy="item.icon" />
                <p class="name over">{{item.name}}</p>
                <p class="info over">{{item.desc}}</p>
                <p class="price">{{item.version[0].size[0].price}}元</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Cart',
  props: {
    title: { type: String, required: true },
    Data: { type: Array, required: true },
    wrap: { type: Boolean },
  },
  data() {
    return {
      index: 0,
      date: Date.now(),
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
    go() {
      if (this.index === this.container_width - 1) {
        this.index = 0;
        this.$refs.container.style.left = -this.index * 100 + "%";
      } else {
        this.index++;
        this.$refs.container.style.left = -this.index * 100 + "%";
      }
    },
    back() {
      if (this.index === 0) {
        this.index = this.container_width - 1;
        this.container.style.left = -this.index * 100 + "%";
      } else {
        this.index--;
        this.container.style.left = -this.index * 100 + "%";
      }
    },
  },
  computed: {
    container() {
      return this.$refs.container;
    },
    container_width() {
      console.log(this.Data);
      return Math.ceil(this.Data.length / 4);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.main {
  margin-top: 30px;
}
.iconfont {
  font-weight: 600;
  border: 1px solid #ccc;
  padding: 5px 10px;
  color: #ccc;
  cursor: pointer;
  &:hover {
    color: $paimary-color;
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
}
.main_box {
  display: flex;
  padding-bottom: 40px;
}

._box {
  width: $left-width * 1px;
  padding: 0 10px;
  text-align: center;
  background: white;
  font-size: 20px;
  color: #666;
  cursor: pointer;
}
.box-left {
  padding-top: 40px;
  background: #f1eded;
  h4 {
    font-size: 25px;
    color: red;
    font-weight: 200;
  }
  & > p {
    font-size: 20px;
    color: #666;
    padding-bottom: 30px;
  }
  img {
    width: 34px;
    height: 53px;
    margin: 10px;
  }
  & .time {
    display: block;
    padding-bottom: 20px;
    & > i {
      display: inline-block;
      width: 45px;
      height: 45px;
      line-height: 45px;
      background: #5f5750;
      color: white;
      font-size: 30px;
      vertical-align: middle;
      font-style: normal;
    }
  }
}
.left {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: $left-width * 1px;
}
.right_container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  transition: left 0.8s linear;
  left: 0;
}
.slider {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start !important;
  align-content: space-between !important;
  justify-content: space-between;
}
.right {
  flex-grow: 1;
  margin-left: 10px;
  overflow: hidden;
}
.toolbar {
  border-top: 1px solid red;
  background: white;
  height: 100%;
  padding: 15px 0;
  cursor: pointer;
}
.right_box {
  width: 25%;
  text-align: center;
  font-size: 20px;
  color: #666;
  flex-shrink: 0;
  background: #f5f5f5;
  & img {
    height: 160px;
    max-width: 100%;
    margin-top: 10px;
  }

  & .name {
    font-size: 14px;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  & .info {
    font-size: 12px;
    color: #ccc;
    margin-bottom: 10px;
  }
  & .price {
    padding-bottom: 15px;
    color: $paimary-color;
  }
}

.more {
  font-size: 18px;
  font-weight: 200;
  & > .iconfont {
    border: none !important;
    padding: 0;
    font-size: 18px;
  }
}
</style>