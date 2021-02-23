<template>
  <Layout>
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input
        placeholder="请输入关键字"
        v-model="searchKey"
        clearable
        style="width: 300px"
      ></el-input>
      <el-button
        @click="search"
        icon="el-icon-search"
        style="margin-left: 10px"
        circle
        plain
      ></el-button>
      <el-button
        @click="$share()"
        style="margin-left: 10px"
        icon="el-icon-share"
        type="warning"
        plain
        circle
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        round
        plain
        style="float: right"
        @click="goAdd"
        >写博文</el-button
      >
    </el-card>

    <div v-if="posts && posts.length > 0">
      <el-card
        shadow="hover"
        v-for="(item, index) in posts"
        :key="'p' + index"
        style="margin-bottom: 20px"
        v-show="!item.node.hide"
      >
        <div slot="header">
          <el-row>
            <el-col :span="16">
              <span>
                <a
                  style="text-decoration: none; cursor: pointer"
                  @click="goDetails(item.node.id)"
                >
                  <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                  {{ item.node.title }}
                </a>
              </span>
            </el-col>
            <el-col :span="8">
              <div style="text-align: right">
                <el-button
                  @click="$share('/blogs/detail/' + item.node.id)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                ></el-button>
                <!-- <el-button
                  @click="editBlog(item.node.id)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-edit"
                ></el-button> -->
                <!-- <el-button
                  @click="deleteBlog(index)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-delete"
                ></el-button> -->
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          最近更新 {{ item.node.updated_at }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            padding: 10px 0px 0px 0px;
          "
        >
          {{ item.node.description || '暂无简介' }}
        </div>
      </el-card>
      <div style="text-align: center">
        <el-pagination
        @current-change="onSelect"
          background
          layout="prev, pager, next"
          :current-page="page.current"
          :page-size="10"
          :total="page.total * 10"
        >
        </el-pagination>
      </div>
    </div>

    <el-card
      shadow="never"
      style="
        margin-bottom: 20px;
        padding: 20px 0px 20px 0px;
        text-align: center;
      "
      v-if="!posts || posts.length == 0"
    >
      <font style="font-size: 30px; color: #dddddd">
        <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </Layout>
</template>
<page-query>
query($page: Int){
  posts: allStrapiPosts(perPage: 10, page: $page) @paginate{
    pageInfo{
      total: totalPages,
      current: currentPage
    },
    edges{
      node{
        id,
        updated_at,
        title,
        description
      }
    }
  }
}
</page-query>
<script>
export default {
  metaInfo: {
    title: '博客'
  },
  data() {
    return {
      searchKey: ''
    };
  },
  methods: {
    search() {
      const {searchKey, posts} = this;
      posts.forEach(item => {
        if(item.node.title.indexOf(searchKey) > -1) {
          this.$set(item.node, 'hide', false)
        }else {
          this.$set(item.node, 'hide', true)
          console.log(item.node.hide)
        }
      })
    },
    onChange(page) {
      this.$router.push('/blogs/' + (page > 1 ? page : ''))
    },
    goAdd() {
      this.$router.push('/blogs/add')
    },
    goDetails(id) {
      this.$router.push(`/blogs/detail/${id}`)
    },
    editBlog(id) {
      this.$router.push(`/blogs/edit/${id}`)
    },
    deleteBlog(id) {
      console.log(id)
    },
    onSelect(page) {
      this.$router.push(`/blogs/${page > 1 ? page : ''}`)
    }
  },
  computed: {
    posts() {
      return this.$page.posts.edges;
    },
    page() {
      return this.$page.posts.pageInfo;
    }
  },
};
</script>

<style>
</style>