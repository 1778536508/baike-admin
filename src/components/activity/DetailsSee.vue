<template>
  <div>
    <el-row>
      <h2>活动查看页面</h2>
    </el-row>
    <el-row class="ndy-minWid" type="flex" justify="center">
      <el-col :span="20" center="true">
        <el-form label-width="100px" class="demo-ruleForm">

          <el-form-item label="标题">
            <p>{{ActivityDetails.ruleForm.Myname.name}}</p>
          </el-form-item>


          <!--头像-->
          <el-form-item label="活动头像" class="ndymargin">
            <div class="ndy-images"  v-if="ActivityDetails.ruleForm.Myimages.imagesArr[0] ? ActivityDetails.ruleForm.Myimages.imagesArr[0].imagesUrl : false">
              <div>
                <div>
                  <img width="100%" :src="ActivityDetails.ruleForm.Myimages.imagesArr[0].imagesUrl" alt="">
                </div>
              </div>
            </div>
          </el-form-item>



          <el-form-item label="时间">
            <p>{{ActivityDetails.ruleForm.Mydate1.date1}}  -  {{ActivityDetails.ruleForm.Mydate2.date2}}</p>
          </el-form-item>
          <el-form-item label="地点">
            <p>{{ActivityDetails.ruleForm.Myregion.region}}</p>
          </el-form-item>

          <el-form-item label="正文:">
            <div v-html="ActivityDetails.ruleForm.Mycontent.longContent"></div>
          </el-form-item>

          <el-row>
            <el-col :span="24" class="ndy-odiv">
              <el-button type="el-button el-button--info" @click="$router.go(-1)">取消</el-button>
            </el-col>
          </el-row>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  // vuex
  import {mapGetters, mapActions} from 'vuex'
  // Enc

  export default {
    computed: {
      ...mapGetters([
        'ActivityDetails'
      ])
    },
    methods: {
      ...mapActions([
        'ActivityDetailsHttp'
      ]),
      set (value) {
        // console.log('====>',value)
        this.$store.state.ActivityDetails.ActivityDetails.params.data.informationId = value
      },
    },
    mounted () {
      // 将id传入vuex
      this.set(this.$route.query.id);
      // 执行axios
      this.ActivityDetailsHttp(function () { });
    }
  }
</script>
<style lang="less">
  .newWidth {
    width: 100%;
  }
</style>

