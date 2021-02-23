<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{ detail.name }}</span>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">
              <el-button
                @click="$share()"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-share"
                >分享</el-button
              >
              <el-button
                @click="goGithub(detail.html_url)"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-back"
                >前往GitHub</el-button
              >
              <el-button
                @click="more"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-more-outline"
                >更多项目</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        发布 {{ detail.created_at }} <br />
        更新 {{ detail.updated_at }}
      </div>
      <div
        style="
          font-size: 1.1rem;
          line-height: 1.5;
          color: #303133;
          padding: 20px 0px 0px 0px;
        "
      >
        {{ detail.description }}
      </div>
      <div
        style="
          font-size: 1.1rem;
          color: #303133;
          padding: 15px 0px 15px 0px;
          border-bottom: 1px solid #e4e7ed;
        "
      >
        <el-row>
          <el-col :span="16" style="padding-top: 5px">
            <el-tooltip
              effect="dark"
              :content="'star ' + detail.stargazers_count"
              placement="bottom"
            >
              <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
            </el-tooltip>
            {{ detail.stargazers_count }}
            <el-tooltip
              effect="dark"
              :content="'watch ' + detail.watchers_count"
              placement="bottom"
            >
              <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
            </el-tooltip>
            {{ detail.watchers_count }}
            <el-tooltip
              effect="dark"
              :content="'fork ' + detail.forks_count"
              placement="bottom"
            >
              <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
            </el-tooltip>
            {{ detail.forks_count }}
          </el-col>
          <el-col :span="8" style="text-align: right">
            <el-tag size="small" type="danger" v-if="detail.license">{{
              detail.license.key
            }}</el-tag>
            <el-tag size="small" type="success">{{ detail.language }}</el-tag>
          </el-col>
        </el-row>
      </div>
      <div
        v-html="md"
        v-if="md"
        class="markdown-body"
        style="padding-top: 20px"
      ></div>
      <div
        v-if="!md"
        style="padding: 20px 0px 20px 0px; text-align: center"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </div>
    </el-card>
  </Layout>
</template>

<script>
import { Base64 } from "js-base64";
import MarkdownIt from "markdown-it";
export default {
  metaInfo: {
    title: '仓库详情'
  },
  data() {
    return {
      detail: {},
      md: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { name } = this.$route.params;
      const detailReq = this.$axios.get(
        "https://api.github.com/repos/Ba5sx1a0sen1/" + name
      );
      const mdReq = this.$axios.get(
        `https://api.github.com/repos/Ba5sx1a0sen1/${name}/contents/README.md`
      ).catch(e => {
        return {data: {content: ''}}
      });
      const [detailRes, mdRes] = await Promise.all([detailReq, mdReq]);
      const { data: detail } = detailRes;
      const { data: md } = mdRes;
      this.detail = detail;
      this.md = new MarkdownIt().render(Base64.decode(md.content));
    },
    more() {
      this.$router.replace('/repo/')
    },
    goGithub(url) {
      window.open(url, '_blank')
    }
  },
};
</script>

<style>
</style>