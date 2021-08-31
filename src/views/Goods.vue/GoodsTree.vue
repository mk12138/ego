<template>
  <el-tree
    accordion
    :props="props"
    :load="loadNode"
    lazy
    @node-click="handleNodeClick"
  >
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      val: "", //
    };
  },
  methods: {
    handleNodeClick(data, node) {
      // console.log(data);//拿到选中的值
      this.val = data;
      this.$emit("getTreeData", data);
      //  this.$emit('getTreeData',data)
    },
    //懒加载
    loadNode(node, resolve) {
      if (node.level === 0) {
        // console.log(node);
        this.$api.selectCategory().then((res) => {
          console.log(res);
          if (res.status === 200) {
            return resolve(res.result);
          }
        });
      } else {
        // console.log('node',node);
        this.$api
          .selectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            // console.log('ssssss',res);
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>