<template>
  <el-cascader
    expand-trigger="hover"
    :options="options"
    :props="{
      label: 'cat_name',
      value: 'cat_id',
      children: 'children'
    }"
    v-model="selectedOptions2">
  </el-cascader>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions2: []
    };
  },
  async created() {
    const res = await this.$http.get('categories?type=this.type');
    this.options = res.data.data;
  },
  props: {
    type: {
      type: [String, Number],
      default: '2'
    }
  }
};
</script>

<style>

</style>
