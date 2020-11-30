<template>
  <el-table :data="model">
    <el-table-column prop="_id" label="id" width="300"></el-table-column>
    <el-table-column prop="username" label="名称" width="200"></el-table-column>
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
  name:"User",
  data() {
    return {
      model: [],
    };
  },
  methods: {
    async fech() {
      let res = await this.$http.get("rest/users");
      if (res.status < 300 && res.status >= 200) {
        this.model = res;
      }
    },
    async edit(id) {
      this.$router.push(`/users/edit/${id}`);
    },
    async _delete(row) {
      this.$confirm(`是否要删除 ${row.username}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
        const res =  await this.$http.delete("rest/users/" + row._id);
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
  activated(){
    this.fech();
  }
};
</script>
<style scoped>
</style>