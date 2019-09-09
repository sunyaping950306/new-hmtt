<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单区域 -->
      <el-form :model="articleForm" label-width="100px">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input style="width:300px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="img-btn">
            <img src="../../assets/images/default.png" alt />
          </div>
        </el-form-item>
        <!-- 频道 -->
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 发表、存入草稿按钮 -->
        <el-form-item label="频道">
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: ''
        },
        channel_id: null
      },
      // 编辑器配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }]
          ]
        }
      }
    }
  },
  components: { quillEditor }
}
</script>

<style lang="less">
</style>
