<template>
  <div class="login">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formdata"
    >
      <el-form-item label="账号">
        <el-input v-model="formdata.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="formdata.password"
          type="password" @keyup.enter.native = "login"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        size="medium"
        @click="login"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      formdata: {
        name: "123456",
        password: "123456"
      }
    };
  },
  methods: {
    login() {
      this.$axios.post("/admin/login", this.formdata).then(res => {
          if (res.code == 200) {
            this.$store.commit("CHANGE_USER",res.data)
            this.$message({
              message: res.msg,
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/index");
            }, 1000);
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style scoped lang = "scss">
.login {
  width: 500px;
  height: 300px;
  margin: 50px auto;
  background: #fff;
  padding-top: 80px;
  /deep/ .el-input {
    width: 80%;
  }
  /deep/ .el-button {
    width: 275px;
    margin-top: 40px;
    margin-left: 110px;
  }
}
</style>
