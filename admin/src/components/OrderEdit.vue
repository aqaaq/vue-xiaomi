<template>
  <div class="container">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="日期:">
              <span class="time">{{ props.row.createdAt | time }}</span>
            </el-form-item>
            <br />
            <el-form-item label="商品列表:">
              <div v-for="(item, index) in props.row.item" :key="index">
                <span class="name">{{ item.name }}</span>
              </div>
            </el-form-item>
            <br />
            <el-form-item label="总价:">
              <span class="price">{{ props.row.price }}元</span>
            </el-form-item>
            <br />
            <el-form-item label="联系电话:">
              <span>{{ props.row.address.phone }}</span>
            </el-form-item>
            <br />
            <el-form-item label="收货人地址:">
              <span>{{
                props.row.address.first + "  " + props.row.address.last
              }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单 ID" prop="_id"> </el-table-column>
      <el-table-column label="用户名" prop="address.name"> </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <el-tag
            :type="judgementType(scope.row)"
            :class="judgementType(scope.row) === 'info' ? 'red' : ''"
            disable-transitions
            >{{ judgement(scope.row) }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      total: 0,
      orderList: [],
      currentPage: 0,
      searchValue: "",
    };
  },

  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },
    async fetch() {
      var total = this.currentPage;
      var loading = this.$loading({});
      var res = await this.$http.get(`/web/allOrder/${total}`);
      if (res) {
        this.total = res.length ? res.length : this.total;
        this.orderList = res.result;
      }
      loading.close();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
      return "";
    },
    currentChange(currentPage) {
      if (this.currentPage != currentPage) {
        this.currentPage = currentPage;
        this.fetch();
      }
    },
    judgement(data) {
      if (data.payType) {
        return data.payType;
      }
      if (Date.now() > data.endTime) {
        return "订单关闭";
      } else {
        return "待支付";
      }
    },
    judgementType(data) {
      if (data.payType) {
        return "success";
      }
      if (Date.now() > data.endTime) {
        return "info";
      } else {
        return "primary";
      }
    },
  },
  filters: {
    time(date) {
      date = new Date(date);
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        min = date.getMinutes();
      return year + "-" + month + "-" + day + " " + hours + ":" + min;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
<style lang="scss">
.container {
  padding: 10px 10px;
}

.el-table .warning-row {
  background: #e6f0fd;
}

.el-table .success-row {
  background: #ffffff;
}
.red {
  color: red !important;
}
.price {
  font-size: 18px;
  color: orange;
}
.name {
  font-size: 18px;
  color: #666;
}
.el-table__expanded-cell {
  background: rgb(251, 253, 255);
}
</style>
