<template>
  <div class="_main" v-if="imgList">
    <i class="iconfont icon-tubiaozhizuomoban left controller"
    :style="{left:left?left+'px':0}"
     @click="min"></i>
    <i class="iconfont icon-you right controller" @click="add"></i>
    <!-- swiper -->
    <router-link
      tag="img"
      :to="item.url ? item.url : ''"
      v-for="(item, index) in imgList"
      :key="index"
      v-lazy="item.image"
      :class="{ show: activeId === index, img: true }"
    ></router-link>
    <!-- slider-btn -->
    <div v-if="imgList.length > 1">
      <span v-if="form === 'aircle'">
        <i
          @click="activeId = i - 1"
          :class="{ circle: true, active: activeId === i - 1, common: true }"
          v-for="i in imgList.length"
          :key="i"
        ></i>
      </span>
      <span class="center" v-else>
        <i
          @click="activeId = i - 1"
          :class="{ rectangle: true, active01: activeId === i - 1 }"
          v-for="i in imgList.length"
          :key="i"
        ></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgList: { type: Array, required: true },
    open: { type: Boolean, default: false },
    timeout: { type: Number, default: () => 3000 },
    form: { type: String, default: "aircle" },
    left:{type:Number}
  },
  data() {
    return {
      activeId: 0,
      time: "",
    };
  },
  methods: {
    go() {
      if (this.open) {
        this.time = setInterval(() => {
          if (this.activeId === this.imgList.length - 1) {
            this.activeId = 0;
          } else {
            this.activeId++;
          }
        }, this.timeout);
      } else {
        return false;
      }
    },
    add() {
      if (this.activeId === this.imgList.length - 1) {
        this.activeId = 0;
      } else {
        this.activeId++;
      }
    },
    min() {
      if (this.activeId === 0) {
        this.activeId = this.imgList.length - 1;
      } else {
        this.activeId--;
      }
    },
  },
  watch: {
    imgList: {
      handler: function () {
        clearInterval(this.time);
        this.activeId = 0;
        this.go();
      },
      deep: true,
      immediate: true,
    },
    activeId() {
      clearInterval(this.time);
      this.go();
    },
  },
};
</script>
<style lang="scss" scoped>
._main {
  display: flex;
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .controller:hover {
    background: rgba($color: #000000, $alpha: 0.3);
  }
  .controller {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    z-index: 20;
    color: white;
    cursor: pointer;
  }
  .right {
    right: 0;
  }
  & img {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.8s linear;
    cursor: pointer;
  }
  & .show {
    opacity: 1;
    z-index: 10;
  }
  & .center {
    position: absolute;
    bottom: 15px;
    width: 100%;
    text-align: center;
  }
  & span {
    position: absolute;
    bottom: 15px;
    right: 40px;
    z-index: 20;
    & .circle {
      display: inline-block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      background: #666;
      border: 2px solid #ccc;
      margin-left: 8px;
      cursor: pointer;
    }
    & .rectangle {
      display: inline-block;
      width: 55px;
      height: 3px;
      background: #ccc;
      margin: 3px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .active {
      background: #ccc;
    }
    .active01 {
      background: #666;
    }
  }
}
</style>