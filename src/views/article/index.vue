<template>
  <div class="article-container">

    <!-- 筛选容器 -->
    <el-card class="box-card">
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选容器内容 -->
      <el-form ref="form" :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dataValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果容器 -->
    <el-card>
      <div slot="header">
        根据筛选结果共查询到
        <b>{{total}}</b>条结果
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px;height:75px">
              <!-- 加载不成功则显示失败图片 -->
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" style="width:100px;height:75px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit"  @click="edit(scope.row.id)" plain circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

      // 提交给后台的筛选条件 传参
      // 数据默认是''还是null的区别 ，如果是null则不会发送字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 默认频道数据
      channelOptions: [{ name: 'Java', id: 1 }],
      // 日期控件的数据
      dataValues: [],
      // 文章数据
      articles: [],
      // 文章总数
      total: 0
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
    // 获取列表数据
    this.getArticles()
  },
  methods: {

    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      // 使用axios后
      // post 传参 axios.post('url',{参数对象})
      // get 传参 axios.get('url',{params:{参数对象}})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
      // console.log(data)
    },
    // 处理选中日期的开始时间和结束时间
    changeDate (values) {
      // 给begin 和end赋值即可
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // 筛选时重新获取文章数据
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    changePager (newPage) {
      // newPage 当前点击的按钮的页码
      // 更新提交给后台的参数
      this.reqParams.page = newPage
      // 获取列表数据
      this.getArticles()
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认的时候 发删除请求,携带的参数是id拼接在地址后
        await this.$http.delete(`articles/${id}`)
        this.getArticles()
        this.$message.success('删除成功')
      }).catch(() => {
        // 点击取消
      })
    },
    // 编辑文章
    edit (id) {
      // 键值对传参用query,路径传参用params
      // this.$router.push('/publish?id' + id)
      this.$router.push({ path: '/publish', query: { id } })
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
