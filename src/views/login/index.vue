<template>
  <div class="login-container">
    <!-- 卡片/登录框 -->
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单组件 -->
      <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 表单数据需要提交，绑定表单数据
  data () {
    // 自定义检验，在return前声明函数
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      // 表单对应的对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 默认勾选"我已阅读并同意"
      checked: true,
      // Form组件通过rules属性传入约定的验证规则
      // Form-Item 的 prop 属性设置为需校验的字段名
      rules: {
        mobile: [
          // 具体的校验规则 比如是否必填 长度 格式
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '验证码为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
    // 整体表单的校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
        // 如果校验成功，进行登录
          this.$http.post('authorizations', this.loginForm)
            .then(res => {
              // res是响应对象 包含响应数据
              const data = res.data
              // 后台返回的json内容 已经转换成了对象
              console.log(data)
              // 登录成功后做什么事情？？
              // 1.跳转到首页
              this.$router.push('/')
              // 2.保持登录状态,使用sessionStorage来存储，关闭浏览器会失效
              window.sessionStorage.setItem('new-hmtt', JSON.stringify(res.data.data))
            })
            .catch(() => {
              // 提示错误  使用组件=>消息提示组件
              this.$message.error('用户名或密码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 350px;
    img {
      display: block;
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
