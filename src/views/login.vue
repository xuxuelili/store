<template>
  <div class="login-wrap">
    <el-form
    label-position="top"
    label-width="80px"
    class="login-from"
    :model="formData">
       <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handelLogin" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handelLogin() {
      const res = await this.$http.post('login', this.formData);
      // console.log(res);
      const data = res.data;
      const {meta: {msg, status}} = data;
      if (status === 200) {
        const {data: {token}} = data;
        sessionStorage.getItem('token', token);
        this.$message.success(msg);
        // 跳转首页
        this.$router.push({name: 'home'});
      } else {
        this.$message.error(msg);
      }
    }
    // handelLogin() {
    //   this.$http
    //     .post('login', this.formData)
    //     .then((res) => {
    //       console.log(res);
    //       const {meta: {msg, status}} = res.data;
    //       if (status === 200) {
    //         // 登录成功
    //         // 记录session
    //         const { data: { token } } = res.data;
    //         sessionStorage.getItem('token', token);
    //         // 提示
    //         this.$message.success(msg);
    //       } else {
    //         this.$message.error(msg);
    //       }
    //     });
    // }
  }
};
</script>

<style>
.login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrap .login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>
