<template>
  
  <Layout>
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{ post.title }}</span>
          </el-col>
          <el-col :span="12">
            <!-- <div style="text-align: right">
              <el-button
                @click="$share()"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-share"
                >分享</el-button
              >
              <el-button
                @click="edit"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button
                style="padding: 3px 0"
                type="text"
                icon="el-icon-more-outline"
                @click="more"
                >更多博客</el-button
              >
            </div> -->
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        发布 {{ post.created_at }} <br />
        更新 {{ post.updated_at }}
      </div>
      <div
        style="
          font-size: 1.1rem;
          line-height: 1.5;
          color: #303133;
          border-bottom: 1px solid #e4e7ed;
          padding: 5px 0px 5px 0px;
        "
      >
        <pre style="font-family: '微软雅黑'">{{ post.description }}</pre>
      </div>
      <div
        v-html="content(post.content)"
        class="markdown-body"
        style="padding-top: 20px"
      ></div>
    </el-card>
  </Layout>
</template>
<page-query>
query($page: Int){
  posts: allStrapiPosts(perPage: 1, page: $page) @paginate{
    pageInfo{
      total: totalPages,
      current: currentPage
    },
    edges{
      node{
        id,
        updated_at,
        title,
        description,
        content
      }
    }
  }
}
</page-query>
<script>
import MarkdownIt from 'markdown-it';
export default {
  metaInfo: {
    title: '最新动态'
  },
  data() {
    return {

    }
  },
  methods: {
    more() {
      this.$router.go(-1)
    },
    edit() {
      this.$router.push(`/blogs/edit/${this.post.id}`)
    },
    content(content) {
      content = content.replace(/\/uploads/g, 'http://8.129.9.133:1337/uploads')
      return new MarkdownIt().render(content)
    }
  },
  computed: {
    post() {
      return this.$page.posts.edges[0].node
    }
  }
}
</script>

<style>

</style>