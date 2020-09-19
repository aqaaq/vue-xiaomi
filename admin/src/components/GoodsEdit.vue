<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form @submit.native.prevent="save" label-width="150px">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理">
          <el-form-item label="上级分类">
            <el-select v-model="model.categories" placeholder="请选择" multiple>
              <el-option
                v-for="(item,index) in parents"
                :key="index"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物品名称">
            <el-input type="text" placeholder="请输入内容" v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="上传头像">
            <el-upload
              :action="backend"
              list-type="picture-card"
              :auto-upload="true"
              :on-success="success"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="当前头像" v-if="model.icon">
            <img :src="model.icon" style="width:200px;" />
          </el-form-item>
          <el-form-item label="物品详情">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="model.info"></el-input>
          </el-form-item>
          <el-form-item label="物品介绍">
            <el-input type="text" placeholder="请输入内容" v-model="model.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">添加物品</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="配置管理">
          <el-form-item>
            <el-button type="primary" @click="model.version.push({image:[],size:[]})">添加型号</el-button>
          </el-form-item>
          <el-row type="flex" v-for="(item,index) in model.version" :key="index">
            <el-col>
              <el-form-item label="物品颜色">
                <el-input type="text" placeholder="请输入内容" v-model="item.color"></el-input>
              </el-form-item>
              <el-form-item label="上传图片">
                <el-upload
                  :action="backend"
                  list-type="picture-card"
                  :auto-upload="true"
                  :on-success="nb(item)"
                >
                  <i slot="default" class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="图片">
                <div
                  class="boxx"
                  @click="item.image.splice(index03,1)"
                  v-for="(item03,index03) in item.image"
                  :key="index03"
                >
                  <img class="img" :src="item03" alt />
                  <span>
                    <i class="el-icon-delete"></i>
                  </span>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="item.size.push({})">添加规格(例如 8G + 256G)</el-button>
              </el-form-item>
              <div style="display:flex;flex-wrap:wrap;margin-bottom: 30px;">
                <div class="box" v-for="(item01,key01) in item.size" :key="key01">
                  <el-form-item label="规格">
                    <el-select v-model="item01.name" placeholder="请选择">
                      <el-option
                        v-for="(item02,key02) in currSize"
                        :key="key02"
                        :label="item02"
                        :value="item02"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="价格">
                    <el-input type="text" placeholder="请输入内容" v-model="item01.price"></el-input>
                  </el-form-item>
                  <el-form-item label="库存">
                    <el-input type="text" placeholder="请输入内容" v-model="item01.repertory"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="text" @click="item.size.splice(key01,1)">删除</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
        info: "",
        icon: "",
        version: [],
        categories: [],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      map: new Map(),
      parents: [],
      size: ["4G + 64G", "6G + 64G", "6G + 128G", "8G + 256G", "8G + 512G"],
    };
  },
  methods: {
    async fetch() {
      this.model = await this.$http.get(`rest/goods/${this.id}`);
    },
    async save() {
      if (!this.model.name) {
        return this.$message("分类名称必填！");
      }
      let res;
      if (this.id) {
        res = await this.$http.put("rest/goods/" + this.id, this.model);
      } else {
        res = await this.$http.post("rest/goods", this.model);
      }
      if (res.status > 300 || res.status < 200) {
        return;
      }
      this.$message.success(this.id ? "修改成功" : "添加成功！");
      this.$router.push("/goods/list");
    },
    async fetchParents() {
      this.parents = await this.$http.get("rest/categories");
      this.map = new Map();
      this.parents.map((val) => {
        this.map.set(val._id, val.sizes);
      });
    },
    test() {
      console.log(this.model);
    },
    success(response, file) {
      this.$set(this.model, "icon", file.response);
    },
    nb(item) {
      return (response, file) => {
        item.image.push(file.response);
      };
    },
  },
  computed: {
    currSize() {
      //console.log(this.map.get(this.model.categories[0]));
      //return this.map.get(this.model.categories[0]);
      let list = [];
      //根据 map 取出 size 数组
      //该表 size select
      this.model.categories.map((val) => {
        let arr = this.map.get(val);

        if (arr) {
          list.push(...arr);
        }
      });
      return list;
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  },
};
</script>
<style scoped>
.box {
  width: 600px;
  padding: 40px 0;
  padding-right: 20px;
  border: 1px solid #ccc;
}
.img {
  height: 150px;
}
.img:hover > .img::after {
  content: "";
}
.boxx {
  display: inline-block;
  height: 150px;
  line-height: 150px;
  text-align: center;
  position: relative;
}
.boxx:hover > span {
  visibility: visible;
}
.boxx > span {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  visibility: hidden;
  background: black;
  opacity: 0.3;
  transition: all 0.3s;
  cursor: pointer;
  text-align: center;
}
.boxx > span > i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 20px;
  z-index: 20;
}
.el-upload {
  border: 1px dashed #d9d9d9 !important;
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
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;

  display: block;
}
</style>