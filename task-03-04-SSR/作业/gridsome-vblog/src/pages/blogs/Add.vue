<template>
  <Layout>
    <el-form ref="form" :model="posts" @submit="onSubmit" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input
          placeholder="请输入标题"
          v-model="posts.title"
          name="title"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          placeholder="请输入描述"
          v-model="posts.description"
          name="description"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          v-model="posts.content"
          name="content"
          placeholder="请输入内容"
          show-word-limit
          resize="none"
          maxlength="140"
          rows="10"
        ></el-input>
      </el-form-item>
      <el-button @click.prevent="goBack">取消</el-button>
      <el-button type="primary" @click.prevent="onSubmit">发布</el-button>
    </el-form>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      posts: {
        title: "",
        content: "",
        description: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题" },
          { max: 15, min: 2, message: "长度在2-15个字之间" },
        ],
        description: [{ required: true, message: "请输入描述" }],
        content: [{ required: true, message: "请输入内容" }],
      },
    };
  },
  methods: {
    metaInfo: {
      title: "发布博客",
    },
    goBack() {
      this.$router.go(-1);
    },
    onSubmit(e) {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { posts } = this;
          console.log(posts);
          try {
            const { data } = await this.$axios.post(
              `${process.env.GRIDSOME_API_URL}posts`,
              posts
            );
            this.posts = {
              title: "",
              content: "",
              description: "",
            };
            this.$message({ message: "发布成功", type: "success" });
          } catch (e) {
            alert("发布失败");
          }
        } else {
          console.log("校验失败");
        }
      });
    },
  },
};
</script>

<style>
</style>