<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px; margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>{{ detail.login }}</span>
        <el-button
          @click="$router.go(-1)"
          style="float: right; padding: 3px 0"
          type="text"
          icon="el-icon-d-arrow-left"
          >返回</el-button
        >
      </div>
      <el-row>
        <el-col :span="9" style="padding: 0px 10px 20px 0px">
          <img :src="detail.avatar_url" style="width: 100%; border-radius: 5px" />
          <div style="padding: 10px">
            <font style="font-size: 26px; line-height: 40px; font-weight: 600"
              >{{ detail.name }}
              <br />
            </font>
            <font
              style="
                font-size: 20px;
                font-style: normal;
                font-weight: 300;
                line-height: 35px;
                color: #666;
              "
              >{{ detail.login }}
              <br />
            </font>
            <font
              style="font-size: 14px; line-height: 20px; color: #606266"
              v-if="detail.location"
            >
              <i class="el-icon-location-outline"></i>&nbsp;&nbsp;{{ detail.location }}
              <br />
            </font>
            <font
              style="font-size: 14px; line-height: 20px; color: #606266"
              v-if="detail.email"
            >
              <i class="el-icon-message"></i>&nbsp;&nbsp;{{ detail.email }}
              <br />
            </font>
            <font style="font-size: 14px; color: #606266" v-if="detail.blog">
              <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
              <a :href="detail.blog" target="_blank">{{ detai.blog }}</a>
              <br />
            </font>
          </div>
        </el-col>
        <el-col :span="15" style="padding: 0px 20px 20px 10px">
          <div
            style="
              width: 100%;
              min-height: 300px;
              border-radius: 5px;
              border: 1px solid #ebeef5;
              padding: 10px;
              font-size: 16px;
              color: #6a737d;
            "
            v-if="detail.bio"
          >
            {{ detail.bio }}
          </div>
          <div
            style="
              width: 100%;
              min-height: 300px;
              border-radius: 5px;
              border: 1px solid #ebeef5;
              padding: 30px;
              text-align: center;
              font-size: 30px;
              color: #dddddd;
            "
            v-else
          >
            <b>◔ ‸◔？没有简介</b>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: '用户主页'
  },
  data() {
    
    return {
      detail: {},
    };
  },
  async created() {
    const { params } = this.$route;
    const { login } = params;
    const { data } = await this.$axios.get(
      "https://api.github.com/users/" + login
    );
    this;
    this.detail = data;
  },
};
</script>

<style>
</style>