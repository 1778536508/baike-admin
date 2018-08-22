<template>
  <div class="dashboard">
    <el-row>
      <el-form :model="form" :rules="rules" ref="create">
        <el-form-item label="" prop="text">
          <el-button type="warning" @click="form.text=''">清空</el-button>
          <el-input type="textarea" v-model="form.text"  rows="10"></el-input>
        </el-form-item>
        <!--<p v-if='ReasonMsg'>确定要发布吗?</p>-->
        <el-form-item style="text-align: center;">
          <el-button @click="btnCacel(1)" type="primary">确定</el-button>
          <el-button @click="btnCacel(2)">取消</el-button>
        </el-form-item>
      </el-form>

    </el-row>
  </div>
</template>
<script>
  export default {
    // props: {
    //   ReasonMsg: ''
    // },
    data: function () {
      return {
        form: {
          text: ''     // 审核不通过原因
        },
        rules: {
          text: [
            {required: true, message: '请填写原因，以便方便解决！', trigger: 'blur'},
            {min: 2, message: '最少为两个字'}
          ]
        },
        formStyle: {
          formLabelWidth: '120px',
          formLabelHeight: '50px'
        }

      }
    },
    methods: {
      // tableRowClassName: function ({row, rowIndex}) {
      //   if (rowIndex % 2 === 1) {
      //     return 'warning-row'
      //   }
      //   return 'success-row'
      // },
      btnCacel (mun) {
        // if (this.ReasonMsg) {
        //   if (mun == 1) {
        //     this.$emit('btn-release', {msg: false, res: 1})
        //   } else {
        //     this.$emit('btn-release', {msg: false, res: 2})
        //   }
        // } else {
          if (mun === 1) {
            // 主动校验
            this.$refs.create.validate((valid) => {
              console.log('valid', valid)
              if (valid === true) {
                this.$emit('btn-cacel', {msg: false, data: this.form})
                this.form.text = ''
              }
            })
          } else {
            this.form.text = '';
            this.$emit('btn-cacel', {msg: false, data: this.form})
            this.form.text = ''
          }
        // }
      }
    }
  }
</script>

<style>
  .el-dialog__wrapper {
    background: rgba(0,0,0,0.5);
  }
</style>
