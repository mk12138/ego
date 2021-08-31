<template>
   <el-pagination background 
    layout="total,prev, pager, next,jumper" 
    :page-size='pageSize'
   :total="total"
   @current-change="changeCurrent"   
   >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: [Number],
      default: 10,
    },
    total: {
      type: [Number],
      default: 10,
    },
  },
  data() {
    return{

    }
  },
  methods: {
    changeCurrent(val) {
      //子传父
      // this.num=val
    //   console.log(val);
      this.$emit('changeCurrent',val)
      // console.log( this.num);
    },
  },

};
</script>

<style>
</style>