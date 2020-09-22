<template>
  <div>
    <v-table  :columns="columns" :table-data="tableData" ></v-table>
  </div>
</template>

<script>
export default {
  name: "easyTable",
  props: {
    Fatherdata: {
      type: Array,
      default: [],
    },
    headData: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      tableData: [],
      columns: []
    };
  },
  created() {
    this.tableData = this.Fatherdata
    this.columns = this.headData
  }
};
</script>

<style>
</style>
