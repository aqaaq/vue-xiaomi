<template>
  <div>
    <h1>{{id?'编辑':'添加'}}广告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input style="width:500px" placeholder="请输入内容" v-model="model.name"></el-input>
      </el-form-item>
      <el-row style="display:flex;flex-wrap:wrap">
        <el-col
          :span="12"
          v-for="(item,index) in model.ads"
          :key="index"
          style="margin-bottom:20px"
        >
          <el-form-item label="url">
            <el-input style="width:500px" v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="$backend"
              :show-file-list="false"
              :on-success="success(item)"
            >
              <img v-if="item.image" :src="item.image" style="height:178px;width:auto" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-button type="text" style="margin-left:120px" @click="model.ads.splice(index,1)">删除</el-button>
        </el-col>
      </el-row>
      <el-button type="text" style="margin-left:120px" @click="model.ads.push({})">添加广告</el-button>

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
        name: "",
        ads: [],
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put("rest/ads/" + this.id, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      res && this.$message.success(this.id ? "修改成功！" : "保存成功!");
      this.$router.push("/ads/list");
    },
    async fech() {
      let data = await this.$http.get(`rest/ads/${this.id}`);
      this.model = { ...data };
    },
    success(item) {
      return (res) => {
        this.$set(item, "image", res);
      };
    },
  },
  created() {
    this.id && this.fech();
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

