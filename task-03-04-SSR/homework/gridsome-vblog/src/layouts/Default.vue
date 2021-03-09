<template>
  <div class="layout">
    <section
      class="page-header"
      :style="
        'background-image: linear-gradient(120deg, ' +
        '#508de6' +
        ', ' +
        '#db4b4b' +
        ');color: ' +
        '#ffffff' +
        ';'
      "
    >
      <div
        v-for="(item, index) in randomIcon"
        :key="'ri' + index"
        :style="
          'position:absolute; top:' +
          item.top +
          'px; left:' +
          item.left +
          'px; z-index:1;'
        "
      >
        <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
          <b>♪</b>
        </font>
      </div>
      <h1 class="project-name">{{ header.title }}</h1>
      <h2 class="project-tagline">{{ header.subtitle }}</h2>
      <a
        :href="'https://github.com/' + userName"
        class="btn"
        target="_blank"
        >GitHub主页</a
      >
    </section>
    <section class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right: 10px">
          <sidebar></sidebar>
        </el-col>
        <transition name="fade">
          <el-col :span="18" style="padding-left: 10px">
            <app-main>
              <slot />
            </app-main>
          </el-col>
        </transition>
      </el-row>
    </section>
    <section class="foot">
      <foot></foot>
    </section>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  },
  header: allStrapiGeneral{
    edges{
      node{
        title,subtitle
      }
    }
  }
}
</static-query>
<script>
import Sidebar from "./components/Sidebar";
import AppMain from "./components/AppMain";
import Foot from "./components/Foot";
export default {
  components: { Sidebar, AppMain, Foot },
  data() {
    return {
      randomIcon: [],
      userName: process.env.GRIDSOME_GITHUB_USER_NAME
    };
  },
  computed: {
    header() {
      return this.$static.header.edges[0].node
    }
  }
};
</script>
<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  /* line-height: 1.5; */
}
h1 {
  margin: 0;
}
.layout {
  /* max-width: 760px; */
  margin: 0 auto;
  /* padding-left: 20px;
  padding-right: 20px; */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}

/* head */
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: normal;
  opacity: 0.7;
}

.btn:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
  text-decoration: underline;
}

a:active,
a:hover {
  outline: 0;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
  color: #1e6bb8;
  text-decoration: none;
}

.btn + .btn {
  margin-left: 1rem;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
/* head */
/* transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* transition */
</style>
