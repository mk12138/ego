<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="clearForm"
      width="70%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="showInnerVisible"
            >类目选择</el-button
          >
          {{ ruleForm.category }}
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <img
            :src="ruleForm.image"
            style="width: 140px; vertical-align: middle; margin-left: 20px"
          />
          <el-button type="primary" @click="uploadImage">上传图片</el-button>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <Wangeditor @getWangData="getWangData" ref="wangEditor" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm() ">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 1.内弹框  类目选择 -->
    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <GoodsTree ref="setTitle" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              this.innerVisible = false;

              this.ruleForm.category = this.$refs.setTitle.val.name;
              this.ruleForm.cid = this.$refs.setTitle.val.cid;
            }
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 2.内弹窗  上传图片 -->
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="imginnerVisible"
      append-to-body
    >
      <GoodImg @showImage="showImage" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              imginnerVisible = false;
            }
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from "./GoodsTree.vue";
import GoodImg from "./GoodImg.vue";
import Wangeditor from "./Wangeditor.vue";
export default {
  components: {
    GoodsTree,
    GoodImg,
    Wangeditor,
  },
  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    num:{
       type: Number,
      default: 1,
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    rowData(val) {
      //延迟加载  this.$nextTick()
      this.$nextTick(() => {
        console.log("监听数据修改了", val);
        this.ruleForm = val;
        //清空富文本编译器
        // console.log(this.$refs.wangEditor);
        this.$refs.wangEditor.editor.txt.html(val.descs);
      });
    },
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      imginnerVisible: false, //内弹框--图片
      innerVisible: false, //内弹框--类目

      ruleForm: {
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showInnerVisible() {
      this.innerVisible = true;
    },
    uploadImage() {
      //上传图片
      this.imginnerVisible = true;
    },
    //回显图片
    showImage(val) {
      this.ruleForm.image = val;
    },
    //商品描述
    getWangData(val) {
      this.ruleForm.desc = val;
    },
    //商品添加
    submitForm() {
      let { title, cid, category, sellPoint, price, num, desc, image } =
        this.ruleForm;
      if (this.title == "添加商品") {
        this.$api
          .insertTbItem({
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image,
          })
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，这是一条成功消息",
                type: "success",
              });
              //添加成功
           
              //清空表单数据 1.初始化ruleForm 2.element-ui提供的重置
              this.ruleForm = {
                category: "", //类目名称
                cid: "", //类目标识
                title: "",
                price: "",
                num: "",
                sellPoint: "",
                image: "",
                desc: "",
              };
              this.clearForm();
              //刷新商品列表--操作父元素里面方法
              this.$parent.http(1);
            } else {
              this.$message.error("错了哦，添加商品失败了");
            }
          });
      } else {
        //编辑
        // console.log(this.rowData);
        this.$api
          .updateTbItem({
            title,
            sellPoint,
            price,
            cid,
            category,
            num,
            desc,
            image,
            id: this.rowData.id,
          })
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              //隐藏窗口清空表单
                this.clearForm();
              //刷新商品列表--操作父元素里面方法
              this.$parent.http(this.num);
            }
          });
      }
    },
    clearForm() {
      // console.log("--------------");
      this.dialogVisible = false; //隐藏弹框
      //清空表单数据 1.初始化ruleForm 2.element-ui提供的重置
      this.ruleForm = {
        category: "", //类目名称
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      };
      //单独清空富文本编译器 editor.txt.clear() 清空编辑器内容
      this.$refs.wangEditor.editor.txt.clear();
    },
  },
};
</script>

<style>
</style>