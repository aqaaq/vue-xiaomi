<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form @submit.native.prevent="save" label-width="150px">
      <el-form-item label="上级分类" v-if="parents">
        <el-select v-model="model.parents" placeholder="请选择" multiple>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新建分类">
        <el-input v-model="model.name" width="400"></el-input>
      </el-form-item>
      <el-form-item label="版本规格">
        <el-button type="text" @click="model.sizes.push(' ')">添加(例如4G + 64G，默认)</el-button>
        <br />
        <div v-for="(item,key) in model.sizes" :key="key">
          <el-input
            type="text"
            :rows="4"
            placeholder="请输入内容"
            v-model="model.sizes[key]"
            style="width:400px;margin-right:30px"
            required
          ></el-input>
          <el-button type="text" @click="model.sizes.splice(key,1)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input type="text" v-model="model.desc"></el-input>
      </el-form-item>
      <el-form-item label="排列顺序">
        <el-input type="text" v-model="model.index"></el-input>
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
      model: {
        sizes: [],
      },
      parents: {},
    };
  },
  methods: {
    async fetch() {
      this.model = await this.$http.get(`rest/categories/${this.id}`);
    },
    async save() {
      if (!this.model.name) {
        return this.$message("分类名称必填！");
      }
      let boo = true;
      this.model.sizes.map((val) => {
        if (!val.trim()) {
          boo = false;
        }
      });
      if (!boo) {
        return this.$message("规格不能填空值！");
      }
      if (this.id) {
        await this.$http.put("rest/categories/" + this.id, this.model);
      } else {
        await this.$http.post("rest/categories", this.model);
      }
      this.$message.success(this.id ? "修改成功" : "添加成功！");
      this.$router.push("/categories/list");
    },
    async fetchParents() {
      this.parents = await this.$http.get("rest/categories");
      console.log(this.parents);
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  },
};
</script>
<style scoped>
</style>