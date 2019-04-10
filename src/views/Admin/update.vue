<template>
  <div class="ad_admin">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="账号">
        <el-input v-model="userInfo.name" class="input" disabled></el-input>
      </el-form-item>
      <el-form-item label="原密码">
        <el-input
          type="password" class="input"
          v-model="userInfo.password"
        ></el-input>
       </el-form-item>
        <el-form-item label="新密码">
        <el-input
          v-model="form.password"
          type="password" class="input"
        ></el-input>
      </el-form-item>
       <el-form-item label="个人描述">
        <el-input v-model="userInfo.desc" class="input"></el-input>
      </el-form-item>
       <el-form-item label="联系电话">
        <el-input v-model="userInfo.tel" class="input"></el-input>
      </el-form-item>
      <el-form-item label="权限">
       <el-input-number v-model="userInfo.level"  disabled></el-input-number>
       <p class="notice">注:0为超级管理员，1为普通管理员</p>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        level: "",
        desc:'',
        tel:''
      }
    };
  },
  methods: {
    onSubmit() {
      let id = this.userInfo.id
     this.form = {
        password:this.form.password,
        level:this.userInfo.name,
        desc:this.userInfo.desc,
        tel:this.userInfo.tel

     }
     console.log(id)
      this.$axios.patch(`/admin/update/${id}`,this.form).then(res=>{
        if(res.code == 200){
          this.$store.commit("CHANGE_USER",res.data)
          console.log(res.data);
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
           this.$router.push('/admin_list')
          }, 1000);
        }else{
          this.$message({
            message: res.msg + "请不要重复命名",
            type: "error"
          });
        }
      })
    }
  },
  computed:{
...mapState(["userInfo"]),
  }
};
</script>

<style scoped lang = "scss">
.ad_admin{
  background: #fff;
  padding-bottom: 20px;
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
