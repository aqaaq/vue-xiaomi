<template>
  <el-table :data="model">
    <el-table-column prop="_id" label="id" width="150"></el-table-column>
    <el-table-column prop="name" label="名称" width="150"></el-table-column>
    <el-table-column label="image" width="200">
      <template slot-scope="scope">
        <img style="max-width:170px" :src="scope.row.icon">
      </template>
    </el-table-column>
    <el-table-column prop="categories[0].name" label="上级分类" width="200"></el-table-column>
    <el-table-column label="颜色" width="300">
      <template slot-scope="scope">
        <el-select v-model="scope.row.version.select"  placeholder="请选择">
          <el-option
            v-for="(item,key) in scope.row.version"
            :key="key"
            :label="item.color"
            :value="item._id"
          ></el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="middle" type="text" @click="edit(scope.row._id)">编辑</el-button>
        <el-button size="middle" type="text" @click="_delete(scope.row)">删除{{scope.name}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      model: [],
      scrollT:0
    };
  },
  methods: {
    async fech() {
      this.model = await this.$http.get("rest/goods");
    },
    async edit(id) {
      this.$router.push(`/goods/edit/${id}`);
    },
    async _delete(row) {
      this.$confirm(`是否要删除 ${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
         const res =  await this.$http.delete("rest/goods/" + row._id);
          res&&this.$message.success("删除成功！");
          this.fech();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fech();
  },

};
</script>
<style scoped>
</style>