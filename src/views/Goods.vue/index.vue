<template>
  <div>
    <!-- 1. 搜索框 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="goSearch"
        @input="goinput"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <!-- 2. 表格 -->
    <el-table
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :data="tableData"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column prop="title" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="100">
      </el-table-column>
      <el-table-column prop="category" label="规格类目"> </el-table-column>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 3.批量操作 -->
    <div style="margin-top: 20px">
      <el-button @click="deleteinbatches()">批量删除</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <!--4. 分页器 -->
    <div class="pagination">
      <MyPagination
        :pageSize="pageSize"
        :total="total"
        @changeCurrent="changeCurrent"
      />
    </div>
    <!-- 4. 弹窗-->
    <GoodDialog ref="dialog" :title="title" :num="num" :rowData="rowData" />
  </div>
</template>

<script>
import MyPagination from "../../components/MyPagination.vue";
import GoodDialog from "./GoodDialog.vue";
export default {
  components: {
    MyPagination,
    GoodDialog, //弹窗
  },
  data() {
    return {
      num: 1, //当前页码
      title: "添加商品",
      tableData: [], //表格商品内容{name.xx}
      pageSize: 10,
      total: 10,
      search: "", //搜索框内容
      rowData: {},
      multipleSelection: [], //选中数组
    };
  },
  methods: {
    //编辑商品
    handleEdit(index, row) {
      console.log(index, row);
      // console.log("编辑商品", row);
      this.$refs.dialog.dialogVisible = true;
      this.title = "编辑商品"; //新地址：1. {...}  2. Object.assgin({},row)
      this.rowData = { ...row }; //row={}
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除
          this.$api.deleteProduct({ id: row.id }).then((res) => {
            if (res.status === 200) {
              //更新视图
              this.http(this.num);
              this.$message({
                message: "删除成功",
                type: "success",
              });
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // this.$api.deleteProduct({

      // })
    },
    //点击页码控制
    changeCurrent(val) {
      this.num = val;
      this.http(val);
    },
    //搜索框添加事件
    goSearch() {
      // console.log(this.search);
      if (this.search) {
        //有内容
        this.$api
          .getSearch({
            search: this.search,
          })
          .then((res) => {
            // console.log(res);//拿到数据 渲染视图
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              this.pageSize = 8;
              this.total = res.data.result.length;
            } else {
              console.log("查无数据");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 0;
            }
          });
      } else {
        this.http(1);
      }
    },

    goinput() {
      // console.log(this.search);
      if (!this.search) {
        this.http(1);
      }
    },
    /**
     * 网络请求  封装了让子组件调用
     */
    http(page) {
      this.$api
        .getProductList({
          page,
        })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            //显示每天条数
            this.pageSize = res.pageSize;
            this.total = res.total;
          }
        });
    },
    //显示弹窗添加功能
    showDialog() {
      console.log("显示弹框");
      this.title = "添加商品"; //新地址：1. {...}  2. Object.assgin({},row)
      this.$refs.dialog.dialogVisible = true;
    },
    //批量操作
    toggleSelection(rows) {
      console.log(rows);
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
    },
    //批量删除
    deleteinbatches() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除
          var idArr = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            const element = this.multipleSelection[i];
            idArr.push(element.id);
          }
          console.log(idArr);
          this.$api.deleteBatches({ idArr }).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              //刷新页面
            this.http(this.num)


            }
          });
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
    this.$api
      .getProductList({
        page: 1,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.tableData = res.data;
          //显示每天条数
          this.pageSize = res.pageSize;
          this.total = res.total;
        }
      });
  },
};
</script>

<style lang='scss' scoped>
.pagination {
  text-align: center;
  margin-top: 20px;
}
.header {
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  button {
    margin-left: 20px;
  }
}
</style>