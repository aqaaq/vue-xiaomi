<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="id" width="320"></el-table-column>
      <el-table-column prop="name" label="广告名"></el-table-column>
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="middle" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async fech() {
      this.tableData = await this.$http.get("rest/ads");
    },
    edit(id) {
      this.$router.push("/ads/edit/" + id);
    },
    remove(row) {
      this.$confirm("此操作将删除" + row.name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/ads/${row._id}`);
          res && this.$message.success("删除成功!");
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