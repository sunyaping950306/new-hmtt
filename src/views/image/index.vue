<template>
  <div>
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
        <el-button size="small" type="success" style="float:right">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <!-- 删除、收藏 -->
          <div class="icons" v-if="!reqParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
      // 素材列表
      images: []
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取素材
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // console.log(data)
      this.images = data.results
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
        &.red{
          color: red;
        }
      }
    }
  }
}
</style>
