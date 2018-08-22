<template>
  <div>
    <user-edit v-if="contents == 1"></user-edit>
    <user-add v-if="contents == 2"></user-add>
  </div>
</template>
<script>
  // 编辑
  import userEdit from '@/components/usermanage/userEdit.vue'
  import userAdd from '@/components/usermanage/userAdd.vue'
  /**
   * @data
   *    contents:    1  编辑
   *                 2  新增
   *                 3  查看
   *                 4  审核
   */
  export default {
    components: {
      userEdit,
      userAdd
    },
    data () {
      return {
        contents: this.$route.params.type
      }
    },
    mounted () {
      console.log('======>',this.$route.params.type)
    }
  }

</script>
<style>


</style>
