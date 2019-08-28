<template>
  <el-container class="home-container">
    <el-aside :width="collapse?'64px':'200px'" class="my-aside">
      <div class="logo" :class="{close:collapse}"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#002048"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客教育科技股份有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img
              style="vertical-align:middle"
              width="30"
              height="30"
              :src="photo"
              alt
            />
            <b style="vertical-align:middle;padding-left:5px">{{name}}</b>
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <!-- 显示二级路由的地方 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('new-hmtt'))
    // console.log(user)
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('new-hmtt')
      this.$router.push('/login')
    }
  },
  components: {}
}
</script>

<style lang="less">
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
  .my-aside {
    background-color: #002048;
    .logo {
      height: 60px;
      width: 100%;
      background: #002840 url("../../assets/images/logo_admin.png") no-repeat
        center / 140px auto;
    }
    .close {
      background-image: url('../../assets/images/logo_admin_01.png');
      background-size: 36px auto;
    }
  }
}
</style>
