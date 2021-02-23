<template>
  <Layout>
    <el-card
      shadow="never"
      style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px 0px"
    >
      <el-tabs v-model="activeTab" type="card" @tab-click="onTabClick">
        <el-tab-pane
          :label="'粉丝 ' + followersTotal"
          name="followers"
          style="padding: 5px"
        >
          <div v-loading="followers.loading">
            <div v-if="followers.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in followers"
                  :key="'followers' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link :to="'/social/detail/' + item.node.login">{{
                      item.node.login
                    }}</g-link>
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.html_url"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="item.node.avatar_url"
                      style="
                        width: 100%;
                        border-radius: 5px;
                        margin-top: 5px;
                        height: 173px;
                        background: #eeeeee;
                      "
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page="followersPage.current"
                  :page-size="1"
                  :total="followersPage.total"
                >
                </el-pagination>
              </div>
            </div>
            <div
              style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              "
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="'关注 ' + followeingTotal"
          name="following"
          style="padding: 5px"
        >
          <div v-loading="following.loading">
            <div v-if="following.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in following"
                  :key="'following' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link :to="'/social/detail/' + item.node.login">{{
                      item.node.login
                    }}</g-link>
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.node.html_url"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="item.node.avatar_url"
                      style="
                        width: 100%;
                        border-radius: 5px;
                        margin-top: 5px;
                        height: 173px;
                        background: #eeeeee;
                      "
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page="followingPage.current"
                  :page-size="1"
                  :total="followingPage.total * 3"
                >
                </el-pagination>
              </div>
            </div>
            <div
              style="
                min-height: 300px;
                margin-bottom: 20px;
                padding: 20px 0px 20px 0px;
                text-align: center;
              "
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </Layout>
</template>
<page-query>
query($page: Int){
  followers:allFollowers(perPage: 3, page: $page) @paginate{
    pageInfo{
      total: totalPages,
      current: currentPage
    },
    totalCount,
    edges{
      node{
        id,
        login,
        html_url,
        avatar_url
      }
    }
  },
  following:allFollowing(perPage: 3, page: $page) @paginate{
    pageInfo{
      total: totalPages,
      current:currentPage
    },
    totalCount,
    edges{
      node{
        id,
        login,
        html_url,
        avatar_url
      }
    }
  }
}
</page-query>
<script>
export default {
  metaInfo: {
    title: '社交圈'
  },
  data() {
    return {
      activeTab: "followers",
    };
  },
  computed: {
    followers() {
      return this.$page.followers.edges;
    },
    followersPage() {
      return this.$page.followers.pageInfo;
    },
    followersTotal() {
      return this.$page.followers.totalCount;
    },
    following() {
      return this.$page.following.edges;
    },
    followingPage() {
      return this.$page.following.pageInfo;
    },
    followeingTotal() {
      return this.$page.following.totalCount;
    },
  },
  methods: {
    onSelect(page) {
      const { activeTab } = this;
      this.$router.push("/social/" + (page > 1 ? page : ""));
    },
    onTabClick(e) {
      const { props } = e;
      const { activeTab } = this;
      const name = (props && props.name) || "followers";
      if (activeTab === name) return;
      this.activeTab = name;
      this.onSelect(1);
    },
  },
};
</script>

<style>
</style>