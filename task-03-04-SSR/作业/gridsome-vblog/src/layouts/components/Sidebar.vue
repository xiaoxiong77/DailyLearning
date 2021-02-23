<template>
  <div>
    <el-card shadow="never" class="side-container" style="height: 100%">
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item
          v-for="item in menuList"
          :key="item.type"
          :index="item.path"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      active: "/news",
      parentUrl: "",
      menuList: [
        {
          title: "最新动态",
          type: "news",
          icon: "el-icon-star-off",
          path: "/news",
        },
        {
          title: "社交圈",
          type: "social",
          icon: "el-icon-mobile-phone",
          path: "/social",
        },
        {
          title: "博客列表",
          type: "blog",
          icon: "el-icon-edit-outline",
          path: "/blogs",
        },
        {
          title: "开源项目",
          type: "repo",
          icon: "el-icon-service",
          path: "/repo",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    let arr = this.$route.path.split("/");
    this.active = "/" + arr[1];
  },
  methods: {
    onSelect(index) {
      this.$router.push(index);
    },
    openTokenDialog() {
      this.$refs.tokenDialog.open(() => {});
    },
    cancellation() {
      this.$store.dispatch("Cancellation");
    },
  },
};
</script>
<style>
.side-container {
  height: 100%;
}
</style>