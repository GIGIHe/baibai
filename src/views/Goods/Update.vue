<template>
  <div class="ad_goods">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="商品名称">
        <el-input v-model="result.g_name" class="input"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input
          v-model="result.g_price"
          class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品头图">
        <el-input
          v-model="result.poster" class="input"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          v-model="result.g_desc" class="input"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
</el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      result:[],
      form: {

      }
    };
  },
  computed:{
...mapState(["goods"])
  },
  mounted(){
 this.getData()
  },
  methods: {
    getData(){
      let id = this.$route.query.id
       this.$axios.get(`/goods/${id}`).then(res=>{
      if(res.code == 200){
    this.result = res.data
          this.$message({
            message: res.msg,
            type: "success"
          });
       }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
       }
        })
    },
    onSubmit() {
      this.form = {
        g_name: this.result.g_name,
        g_price: this.result.g_price,
        poster: this.result.poster,
        g_desc:this.result.g_desc
      }
        let id = this.$route.query.id
      this.$axios.patch(`/goods/${id}`,this.form).then(res=>{
        if(res.code == 200){
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
           this.$router.push('/goods_list')
          }, 1000);
        }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      })
    }
  }
};
</script>

<style scoped lang = "scss">
.ad_goods{
  background: #fff;
  height: 90vh;
  margin-left: 10px;
  padding-top: 30px;
  .input{
    width: 30%;
  }
  .notice{
    color: red;
    font-size: 12px;
  }
}
</style>
