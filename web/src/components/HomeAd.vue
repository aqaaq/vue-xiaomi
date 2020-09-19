<template>
  <div class="home-ad">
    <!-- iconfont -->
    <div class="home-iconfont">
      <div>
        <i class="iconfont icon-zhongbiao"></i>
        <span>小米秒杀</span>
      </div>
      <div>
        <i class="iconfont icon-qiyetuangou"></i>
        <span>企业团购</span>
      </div>
      <div>
        <i class="iconfont icon-Fma"></i>
        <span>F码通道</span>
      </div>
      <div>
        <i class="iconfont icon-mifenka"></i>
        <span>米粉卡</span>
      </div>
      <div>
        <i class="iconfont icon-yijiuhuanxintubiao03"></i>
        <span>以旧换新</span>
      </div>
      <div>
        <i class="iconfont icon-huafeichongzhi"></i>
        <span>话费充值</span>
      </div>
    </div>
    <router-link tag="div" :to="item.url" v-for="(item,key) in homead.ads" :key="key">
      <img  v-lazy="item.image" />
    </router-link>
  </div>
</template>
<script>
export default {
  // props:{ homead: { type: Array,required:true}}
  props: { homead: { type: Object, required: true } },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scope>
@import "../style/common.scss";
.home-ad {
  display: flex;
  height: 175px;
  justify-content: space-between;
  margin: 20px 0 !important;
  & .home-iconfont {
    display: flex;
    flex-wrap: wrap;
    width: $left-width * 1px;
    background: #5f5750;
    color: rgb(190, 182, 182);
    & > div {
      width: 33%;
      text-align: center;
      padding: 15px 5px;
      border-left: 1px solid rgba(white, 0.1);
      border-top: 1px solid rgba(white, 0.1);
      &:hover {
        color: rgb(230, 230, 230);
      }
    }
    & .iconfont {
      font-size: 22px;
    }
    & span {
      display: block;
      font-size: 12px;
    }
  }
  & > div > img {
    width: 316px;
    height: 100%;
  }
}
</style>