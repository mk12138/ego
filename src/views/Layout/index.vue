<template >
  <div class="layout">
    <!--左侧 导航 -->
    <Myment :isCollapse='isCollapse' />
    <!-- 右侧内容 -->
    <!-- <MainContent></MainContent>   传参太麻烦不要了-->
    <div class="main-content">
      <div class="top-header">
        <div class="left">
          <i
            class="iconfont"
            :class="{
              'icon-right-indent': !isCollapse,
              'icon-left-indent': isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
        <div class="userinfo">
          <el-dropdown style="margin-right:10px;"  @command="handleCommand">
            <span class="el-dropdown-link" style="color:#fff;">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="zh">中文</el-dropdown-item>
              <el-dropdown-item  command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>hello </span>
          <i class="iconfont icon-tuichu" @click="gologin"></i>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Myment from "../../components/Myment.vue";
// import MainContent from './main-content'
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  components: {
    Myment,
    // MainContent
  },
  methods:{
    gologin(){
      //去登录
      console.log('登录了');
      this.$router.push('login')
    },

  /**
     * 切换语法
     */
    handleCommand(command){
        console.log('切换语言',command);
        // console.log(this.$i18n.locale);
        this.$i18n.locale=command;
    }




  }

};
</script>

<style  lang='scss' scoped>
.layout {
  height: 100%;
  display: flex;
  .main-content {
    flex: 1;
    .top-header {
      background: #1e78bf;
      height: 50px;
      line-height: 50px;
      color: #fff;
      display: flex;
      .left {
        flex: 1;
      }
      .iconfont {
        font-size: 24px;
        color: #fff;
        padding-left: 10px;
      }
      .userinfo {
        color: #fff;
        vertical-align: middle;
        padding-right: 20px;
      }
    }
  }
}
</style>