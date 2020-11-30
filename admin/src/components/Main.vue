<template>
  <div class="container">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside class="aside" style="background-color: rgb(238, 241, 246)">
        <el-menu router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>分类管理
            </template>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-wallet"></i>物品管理
            </template>
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/goods/create">新建物品</el-menu-item>
              <el-menu-item index="/goods/list">物品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-coffee-cup"></i>广告管理
            </template>
            <el-menu-item-group>
              <template slot="title">广告</template>
              <el-menu-item index="/ads/create">新建广告</el-menu-item>
              <el-menu-item index="/ads/list">广告列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-coffee-cup"></i>用户管理
            </template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/users/create">新建用户</el-menu-item>
              <el-menu-item index="/users/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-magic-stick"></i>订单管理
            </template>
            <el-menu-item-group>
              <template slot="title">订单</template>
              <el-menu-item index="/orders/list">订单</el-menu-item>
              <el-menu-item index="/orders/edit">订单管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link to="/login" tag="span">{{ user.username }}</router-link>
        </el-header>
        <el-main>
          <router-view :key="$route.path" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
      },
    };
  },
  mounted() {
    this.user.username = localStorage.getItem("user");
    console.log(this.user.username);
  },
};
</script>
<style scoped>
@media screen and (max-width: 500px) {
  .aside {
    width: 150px !important;
  }
}
.aside {
  width: 200px;
}

.container {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
