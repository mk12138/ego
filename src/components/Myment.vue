<template>
  <div class="menu">
    <el-menu
        router
         background-color="rgb(48, 65, 86)"
      text-color="#fff"
        active-text-color="rgb(64, 158, 255)"
      default-active="1"
      class="el-menu-vertical-demo"
    
    
      :collapse="isCollapse"
     
    >
      <el-menu-item index="">
        <span slot="title">后台易购管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-s-tools"></i>
        <span slot="title">{{$t("home.product") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-document"></i>
        <span slot="title">{{$t("home.guige") }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-document"></i>
        <!-- <span slot="title">广告分类</span> -->
        <span slot="title">{{$t("home.advert") }}</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <!-- <span slot="title">个人中心</span> -->
        <span slot="title">{{$t("home.user") }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
//  @open="handleOpen"
    //   @close="handleClose"
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang='scss' scoped>
.menu {
  height: 100%;
  background: rgb(48, 65, 86);
  .el-menu {
    border-right: 0;
    .is-active {
      //选中的el-menu-item
      background: #333 !important;
    }
    .el-menu-item:hover,
    .el-menu-item:focus {
      background: #1f2d3d !important;
      color: rgb(64, 158, 255);
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
 
}
</style>