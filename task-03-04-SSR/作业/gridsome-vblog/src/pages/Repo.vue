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
        icon="el-icon-share"
        type="warning"
        style="margin-left: 10px"
        plain
        circle
      ></el-button>
    </el-card>

    <div v-if="repos && repos.length > 0">
      <el-card
        shadow="hover"
        v-for="(item, index) in repos"
        :key="'pro' + index"
        style="margin-bottom: 20px"
        v-show="!item.node.hide"
      >
        <div slot="header">
          <el-row>
            <el-col :span="16">
              <span>
                <g-link :to="'/repo/detail/' + handleName(item.node.name)">
                  <i class="el-icon-service"></i>&nbsp;&nbsp;
                  {{ item.node.name }}
                </g-link>
              </span>
            </el-col>
            <el-col :span="8">
              <div style="text-align: right">
                <g-link
                  :to="item.node.html_url"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-back"
                  >前往GitHub</g-link
                >
                <el-button
                  @click="$share('/open-source/detail/' + item.node.name)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                ></el-button>
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
          {{ item.node.description }}
        </div>
        <div
          style="font-size: 1.1rem; color: #303133; padding: 10px 0px 0px 0px"
        >
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip
                effect="dark"
                :content="'star ' + item.node.stargazers_count || 0"
                placement="bottom"
              >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ item.node.stargazers_count || 0 }}
              <el-tooltip
                effect="dark"
                :content="'watch ' + item.node.watchers_count"
                placement="bottom"
              >
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ item.node.watchers_count }}
              <el-tooltip
                effect="dark"
                :content="'fork ' + item.node.forks_count"
                placement="bottom"
              >
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ item.node.forks_count }}
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-tag size="small" type="danger" v-if="item.node.license">{{
                item.node.license.key || "other"
              }}</el-tag>
              <el-tag size="small" type="success">{{
                item.node.language
              }}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div style="text-align: center">
        <el-pagination
          @current-change="onChange"
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
      v-if="!repos || repos.length == 0"
    >
      <font style="font-size: 30px; color: #dddddd">
        <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </Layout>
</template>
<page-query>
query($page:Int, $name: String){
  repos:allRepos(perPage: 10, page: $page, filter:{name: {regex: $name}} )@paginate{
    pageInfo{
      total: totalPages,
      current: currentPage
    },
    edges{
      node{
        id,
        name,
        description,
        license{
          name,
          key
        }
        html_url,
        created_at,
        updated_at,
        language,
        stargazers_count,
        watchers_count,
        forks_count
      }
    }
  }
}
</page-query>
<script>
export default {
  metaInfo: {
    title: "开源项目",
  },
  data() {
    return {
      searchKey: "",
    };
  },
  computed: {
    repos() {
      return this.$page.repos.edges;
    },
    page() {
      return this.$page.repos.pageInfo;
    },
  },
  methods: {
    search() {
      const { searchKey, repos } = this;
      this.$page.repos.edges.forEach((item) => {
        if (item.node.name.indexOf(searchKey) > -1) {
          this.$set(item.node, "hide", false);
          console.log(item.node.hide);
        } else {
          this.$set(item.node, "hide", true);
          console.log(item.node.hide);
        }
      });
    },
    onChange(page) {
      this.$router.push("/repo/" + (page > 1 ? page : ""));
    },
    handleName(name) {
      return encodeURIComponent(name);
    },
  },
};
</script>

<style>
</style>