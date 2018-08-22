<template>
  <div>
    <el-row>
      <h2>资讯查看页面</h2>
    </el-row>
    <el-row class="ndy-minWid" type="flex" justify="center">
      <el-col :span="20" center="true">
        <el-form label-width="100px" class="demo-ruleForm">

          <el-form-item label="标题">
            <p>{{ConsultDetails.ruleForm.Myname.name}}</p>
          </el-form-item>

          <!--头像-->
          <el-form-item label="头像" class="ndymargin">
            <div class="ndy-images ndy-images1" v-if="ConsultDetails.ruleForm.Myimages.imagesArr[0] ? ConsultDetails.ruleForm.Myimages.imagesArr[0].imagesUrl : false">
              <div>
                <div>
                  <img :src="ConsultDetails.ruleForm.Myimages.imagesArr[0].imagesUrl" alt="">
                </div>
              </div>
            </div>
            <div class="ndy-images ndy-images2" v-if="ConsultDetails.ruleForm.Myimages.imagesArr[1] ? ConsultDetails.ruleForm.Myimages.imagesArr[1].imagesUrl : false">
              <div>
                <div>
                  <img :src="ConsultDetails.ruleForm.Myimages.imagesArr[1].imagesUrl" alt="">
                </div>
              </div>
            </div>
            <div class="ndy-images ndy-images3" v-if="ConsultDetails.ruleForm.Myimages.imagesArr[2] ? ConsultDetails.ruleForm.Myimages.imagesArr[2].imagesUrl : false">
              <div>
                <div>
                  <img :src="ConsultDetails.ruleForm.Myimages.imagesArr[2].imagesUrl" alt="">
                </div>
              </div>
            </div>
          </el-form-item>


          <el-form-item label="频道">
            <p>{{ConsultDetails.ruleForm.channel.label}}</p>
          </el-form-item>

          <el-form-item label="正文:">
            <div v-html="ConsultDetails.ruleForm.Mycontent.createContent"></div>
            <!--<ul class="ndy-box">-->
              <!--<li v-for="(item, index) in ConsultDetails.ruleForm.longContent" :key="index">-->
                <!--<p class="ndy-h1">{{item.maxtitle}}</p>-->
                <!--<div class="ndy-textContent">-->
                  <!--<p>{{item.text}}</p>-->
                  <!--<div class="ndy-textImages" v-for="(v, i) in item.images" :key="i">-->
                    <!--<div>-->
                      <!--<img :src="v._url" alt="">-->
                    <!--</div>-->
                    <!--<span>{{v.title}}</span>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            <!--</ul>-->
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
        'ConsultDetails'
      ])
    },
    methods: {
      ...mapActions([
        'ConsultDetailsHttp',
        'getChannel'
      ]),
      set (value) {
        // console.log('====>',value)
        this.$store.state.ConsultDetails.ConsultDetails.params.data.informationId = value
      },
    },
    mounted () {
      var _this = this;
      // 将id传入vuex
      this.set(this.$route.query.id);
      // 执行axios
      this.ConsultDetailsHttp(function () {
        _this.getChannel("detailsEdit");
      });
    }
  }
</script>
<style lang="less">
  .newWidth {
    width: 100%;
  }
</style>

