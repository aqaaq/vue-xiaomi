<template>
  <div>
    <h1>{{id?'编辑':'新建'}}用户</h1>
    <el-form @submit.native.prevent="save" label-width="150px">
      <el-form-item label="用户名">
        <el-input v-model="model.username" width="400"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" width="400"></el-input>
      </el-form-item>
      <el-form-item label="管理员等级">
        <el-select v-model="model.level">
          <el-option v-for="i in 6" :key="i" :label="i - 1 " :value="i -1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String },
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async fetch() {
      this.model = await this.$http.get(`rest/users/${this.id}`);
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put("rest/users/" + this.id, this.model);
      } else {
        res = await this.$http.post("test/users", this.model);
      }
      if (res) {
        this.$message.success(this.id ? "修改成功" : "添加成功！");
        this.$router.push("/users/list");
      }
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>
<style scoped>
</style>