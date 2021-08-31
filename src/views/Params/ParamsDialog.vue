<template>
  <div>
    <el-dialog
      title="商品规格参数类目选择"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <GoodsTree @getTreeData="getTreeData" />
      <!-- 内弹框 -->
      <el-dialog
        width="45%"
        title="商品规格参数配置"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>当前选中的商品：{{productInfo.name}}</p>
        <el-button @click="addDomain">新增规格列表</el-button>

        <!-- 第一层遍历数组 -->
        <el-form
          :model="dynamicForm"
          ref="dynamicForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-for="(domain, index) in dynamicForm.groups"
            :label="domain.title"
            :key="index"
          >
            <div class="list">
              <el-input v-model="domain.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)"
                >添加子组</el-button
              >
              <el-button @click.prevent="removeDomain(index)">删除组</el-button>
            </div>
            <!-- 第二层 -->
            <el-form-item
              v-for="(ele, n) in domain.children"
              :label="ele.title"
              :key="n"
            >
              <div class="list">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeCurrentDomain(index, n)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitDynamicForm"
              >提交</el-button
            >
            <el-button @click="resetForm('dynamicForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="isShow"
          @click="innerVisible = true"
          >确 定并添加分组</el-button
        >
      </span>
    </el-dialog>
    <!-- 内弹框 -->
  </div>
</template>

<script>
import GoodsTree from "../Goods.vue/GoodsTree.vue";
export default {
  components: {
    GoodsTree,
  },
  data() {
    return {
      dialogVisible: false,
      isShow: true, //禁止
      innerVisible: false,
      productInfo: {}, //点击tree数据
      dynamicForm: {
        //动态表单数据
        groups: [
          // {
          //   value: "", //规格的值
          //   title: "基本信息", //规格的名称
          //   children: [
          //     {
          //       value: "",
          //       title: "a",
          //     },{
          //        value: "",
          //       title: "b",
          //     }
          //   ],
          // },
          // {
          //   value: "", //规格的值
          //   title: "基本", //规格的名称
          //   children: [
          //     {
          //       value: "",
          //       title: "o",
          //     },
          //   ],
          // },
        ],
        email: "",
      },
    };
  },
  methods: {
    //关闭按钮
    handleClose() {
      this.dialogVisible = false;
    },
    /**
     * 点击tree传递tree数据
     */
    getTreeData(val) {
      console.log("======", val);
      //按钮可以点击
      this.isShow = false;
      this.productInfo = val;
    },

    //动态表单事件-----------------------------------------------
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除大组件
    removeDomain(item) {
      // console.log('点击删除');
      this.dynamicForm.groups.splice(item, 1);
    },
    //增加大组件列表
    addDomain() {
      this.dynamicForm.groups.push({
        value: "",
        title: "",
      });
    },
    //增加子组件
    addChildDomain(index) {
      this.dynamicForm.groups[index].children.push({
        value: "",
        title: "6",
      });
    },
    //删除当前组件
    removeCurrentDomain(index, n) {
      this.dynamicForm.groups[index].children.splice(n, 1);
    },
    /**
     * 提交事件---itemCatId,content,specsName
     *
     */
    submitDynamicForm() {
      console.log("规格数据", this.dynamicForm.groups);
      let specsName = this.productInfo.name;
      let itemCatId = this.productInfo.cid;
      //最好判断规格参数有数据 否则没有添加的必要
      this.$api
        .addRulesParams({
          specsName,
          itemCatId,
          content: JSON.stringify(this.dynamicForm.groups),
        })
        .then((res) => {
          console.log("===----==", res);
          if (res.status === 200) {
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
            //关闭弹框
            this.innerVisible = false;
            this.dialogVisible = false;
            //更新视图
            this.$parent.http(1);
            //清空表单
            // this.$refs.dynamicForm.resetFields();
            this.dynamicForm.groups = [];
            //按钮禁止
            this.isShow = true;
          } else {
            this.$message.error("错了哦，这是一条错误消息");
          }
        });
    },
    
  },
};
</script>

<style lang='scss' scoped>
.list {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>