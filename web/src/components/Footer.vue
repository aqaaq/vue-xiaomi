<template>
  <div style="background:white">
    <div class="footer">
      <ul class="type-none">
        <li>
          <i class="iconfont icon-weixiu"></i>预约维修服务
        </li>
        <li>
          <i class="iconfont icon-tian1"></i>7天无理由退货
        </li>
        <li>
          <i class="iconfont icon-tian"></i>15天免费换货
        </li>
        <li>
          <i class="iconfont icon-liwu"></i>满99包邮
        </li>
        <li>
          <i class="iconfont icon-gaopinxiaohui"></i>520家售后网点
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../style/common.scss";
.footer {
  width: $max-width * 1px;
  margin: auto;
  > ul {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    li {
      text-align: center;
      width: 20%;
      font-size: 20px;
      padding: 30px 0;
      font-weight: 200;
      position: relative;
      &::after {
        content: "";
        width: 1px;
        background: #ccc;
        height: 40px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -20px;
      }
      &:last-child::after {
        content: "";
        width: 0;
      }
      &:hover{
        color: $paimary-color;
        cursor: pointer;
      }
      > .iconfont {
        font-size: 24px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
  }
}
</style>