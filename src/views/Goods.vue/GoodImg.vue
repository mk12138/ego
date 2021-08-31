<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:8888/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSucess"
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from '../../api/config'
export default {
  data() {
    return {
    
      fileList: [],
    };
  },
  methods: {
    submitUpload() {
      //提交上传
      this.$refs.upload.submit();
    },
    handleRemove(response, file, fileList) {
      //    response.url 传递图片路径--回显图片
      console.log(response.url);
      console.log(file, fileList);
    },
    //上传成功
    handleSucess(response, file, fileList) {
    //   console.log(base.baseUrl + "/" + response.url.slice(7));
      let imgUrl = base.baseUrl + "/" + response.url.slice(7);
     this.$emit('showImage',imgUrl)

    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style>
</style>