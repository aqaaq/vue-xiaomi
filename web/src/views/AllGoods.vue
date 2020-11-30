<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部结果</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.keywords }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-show="currentArr.length > 0">
      <div class="container">
        <router-link
          tag="div"
          :to="`/home/details/${item._id}`"
          class="item box_shadow"
          v-for="(item, index) in currentArr"
          :key="index"
        >
          <div class="img_box">
            <img v-lazy="item.default.image[0]" />
          </div>
          <h4 class="name">
            {{
              item.name + " " + item.default.color + " " + item.default.sizeName
            }}
          </h4>
          <strong class="price">{{ item.default.size[0].price }} 元</strong>
          <div class="small_img_box">
            <img
              v-lazy="item01.image[0]"
              v-for="(item01, index01) in item.version"
              :key="index01"
              :class="{ active: index01 === item.choose ? true : '' }"
              @mouseover="goodChangeChoose(item, index01)"
            />
          </div>
        </router-link>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :total="simulation.length * 10"
        >
        </el-pagination>
      </div>
    </div>
    <div v-show="currentArr.length === 0">
      <div class="empty">
        <img src="../assets/icon-search.png" />
        <span>该关键词" {{ $route.query.keywords }} "并没有搜索到商品!</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Breadcrumb, BreadcrumbItem } from "element-ui";
export default {
  data() {
    return {
      simulation: [],
      // 分页 index
      index: 0,
    };
  },
  methods: {
    async fetch(keywords) {
      this.simulation = [];
      let list = await this.$http.get("search?keywords=" + keywords);
      if (list.length < 1) {
        return (this.simulation = list);
      }
      // 修改下数据
      list.map((item) => {
        // Vue.set(item, "choose", 0);
        // Vue.set(item, "default",item.version[0]);
        item.choose = 0;
        item.default = item.version[0];
        item.default.color = item.default.color ? item.default.color : "";
        item.default.sizeName =
          item.default.size[0] && item.default.size[0].name
            ? item.default.size[0].name
            : "默认";

        return item;
      });
      // 每页9条数据
      const length = 12;
      for (let i = 0; i < list.length; i += length) {
        this.simulation.push(list.slice(i, i + length));
      }
    },
    goodChangeChoose(item, index) {
      if (index == item.choose) {
        return;
      }
      item.choose = index;
      item.default = item.version[index];
      item.default.sizeName = item.default.size
        ? item.default.size[0].name
        : "默认";
    },
    currentChange(index) {
      this.index = index - 1;
    },
  },
  created() {
    const keywords = this.$route.query.keywords;
    this.fetch(keywords);
  },
  mounted() {
    console.log(this.$route.query.keywords);
  },
  computed: {
    currentArr() {
      return this.simulation[this.index] ? this.simulation[this.index] : [];
    },
  },
  watch: {
    // 观察 keywords变化发送请求
    "$route.query.keywords"(value) {
      if (this.$route.path === "/home/all/goods") {
        this.fetch(value);
      }
    },
  },
  components: {
    "el-breadcrumb": Breadcrumb,
    "el-breadcrumb-item": BreadcrumbItem,
  },
};
</script>
<style scoped lang="scss">
@import "../style/common.scss";
.main {
  width: 100%;
  min-width: $max-width * 1px;
  background: $main-color;
  padding-bottom: 100px;
  .breadcrumb {
    margin: auto;
    width: $max-width * 1px;
    padding: 20px 0;
  }
  .container {
    margin: auto;
    width: $max-width * 1px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width: 299px;
      height: 410px;
      display: flex;
      padding-top: 50px;
      flex-direction: column;
      align-items: center;
      background: white;
      margin-bottom: 10px;
      margin-right: 10px;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      .img_box {
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          max-height: 100%;
        }
      }
      .name {
        font-size: 16px;
        color: #212121;
        width: 80%;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: normal;
        text-align: center;
      }
      & .price {
        font-size: 16px;
        padding-bottom: 15px;
        color: $paimary-color;
        font-weight: normal;
      }
      .small_img_box {
        display: flex;
        img {
          width: 34px;
          height: 34px;
          border: 1px solid #ccc;
          margin: 0 5px;
        }
        .active {
          border: 1px solid #ff6700;
        }
      }
    }
  }
  .pagination {
    margin: 0 auto;
    margin-top: 20px;
    width: $max-width * 1px;
    display: flex;
    justify-content: center;
  }
}
.empty {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
    margin-bottom: 15px;
  }
  span {
    font-size: 16px;
    color: #666;
  }
}
</style>
