<template>
  <div v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式单选框 -->
        <el-radio-group v-model="reqParams.collect" size="small" @change="search()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>

        <!-- 添加素材 -->
        <el-button
          size="small"
          type="success"
          style="float:right"
          @click="dialogVisible = true"
        >添加素材</el-button>
        <!-- 添加素材 对话框、上传组件 -->
        <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible=false">取消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- 删除、收藏 -->
          <div class="icons" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggleFav(item)"
            ></span>
            <span class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        style="text-align:center"
        v-if="total>reqParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 加载状态
      loading: false,
      // 素材列表
      images: [],
      // 分页相关
      total: 0,
      // 默认隐藏对话框
      dialogVisible: false,
      // 后端返回的数据，控制上传按钮还是显示图片
      imageUrl: '',
      // 在请求头中携带token
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('new-hmtt')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 收藏 取消收藏
    async toggleFav (item) {
      // item包含 id is_collected是否收藏
      const { data: { data } } = await this.$http.put('user/images/' + item.id, { collect: !item.is_collected })
      // 成功 图标切换颜色 red类名
      this.$message.success('操作成功')
      // item.is_collected = !item.is_collected
      item.is_collected = data.collect
    },
    // 上传素材成功后的处理函数
    handleSuccess (res) {
      // 预览 需要地址
      // console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 关闭对话框 更新列表
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        this.getImages()
        // 清空预览区的图片，保证下次点开是空白
        this.imageUrl = null
      })
    },
    // 点击分页上下页和页码时
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 点击全部与收藏时
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取素材
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // console.log(data)
      this.images = data.results
      // 获取总条数
      this.total = data.total_count
      this.loading = false
    }
  },
  components: {}
}
</script>

<style lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    float: left;
    position: relative;
    width: 299px;
    height: 300px;
    border: 1px dashed #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .icons {
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
