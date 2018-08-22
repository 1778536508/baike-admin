<template>
  <div v-cloak>
    <consult-details-edit v-if="contents == 1"></consult-details-edit>
    <consult-details-create v-if="contents == 2"></consult-details-create>
    <consult-details-see v-if="contents == 3"></consult-details-see>
    <consult-details-toexamine v-if="contents == 4"></consult-details-toexamine>
  </div>
</template>
<script>
  // 编辑
  import ConsultDetailsEdit from '@/components/consult/DetailsEdit.vue'
  // 新增
  import ConsultDetailsCreate from '@/components/consult/DetailsCreate.vue'
  // 查看
  import ConsultDetailsSee from '@/components/consult/DetailsSee.vue'
  // 审核页面
  import ConsultDetailsToexamine from '@/components/consult/DetailsToexamine.vue'

  /**
   * @data
   *    contents:    1  编辑
   *                 2  新增
   *                 3  查看
   *                 4  审核
   */
  export default {
    components: {
      ConsultDetailsEdit,
      ConsultDetailsCreate,
      ConsultDetailsSee,
      ConsultDetailsToexamine
    },
    data () {
      return {
        contents: this.$route.query.type,
      }
    },
    mounted () {
      // console.log('======>',this.$route.query.category)
    }
  }

</script>
<style lang="less">
  //禁止用户看到Vue {{}}出现闪栎现象
  [v-cloak] {
    display: none;
  }
  .el-upload--picture-card {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
  .el-upload-list--picture-card {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
  .ndy-minWid {
    min-width: 1000px;
  }
  .ndymargin {
    margin-bottom: 130px;
  }
  .ndy-upload2 {
    .el-upload--picture-card {
      left: 160px;
    }
    .el-upload-list--picture-card {
      left: 160px;
    }
  }
  .ndy-upload3 {
    .el-upload--picture-card {
      left:320px;
    }
    .el-upload-list--picture-card {
      left:320px;
    }

  }
  .ndymargin .el-form-item__error{
    top: 370%;
  }
  .v-modal{
    display: none;
  }
  .el-message-box__wrapper {
    background: rgba(0,0,0,0.5);
  }
  @wiHei: 148px;
  @100: 100%;
  .windHeig (@w, @h) {
    width: @w;
    height: @h;
  }
  .ndy-images {
    margin-right: 20px;
    .windHeig (@wiHei, @wiHei);
    border-radius: 6px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    &.ndy-images2{
      left: 160px;
    }
    &.ndy-images3{
      left: 320px;
    }
    div {
      .windHeig (@100, @100);
      position: relative;
      div{
        img {
          .windHeig (@100, @100);
        }
      }
      .ndy-el-icon {
        display: none;
        .windHeig (@100, @100);
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        text-align: center;
        line-height: 148px;
        i{
          cursor: pointer;
          color: #fff;
          font-size: 20px;
        }
      }

    }
  }
  .ndy-images:hover {
    .ndy-el-icon {
      display: block;
    }
  }

  .ndy-textarea{
    width: 100%;
    min-height: 500px;
    border-radius: 10px;
    overflow: hidden;
  }
  .ndy-odiv{
    text-align: center;
  }
  .ql-container {
    min-height: 500px;
    padding-bottom: 50px;
  }
  .consult-images-cations{
    margin-left: 500px;
    font-size: 20px;
    color: red;
  }
</style>
