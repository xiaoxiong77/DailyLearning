<template>
    <div>
        <div class="home-page">

            <div class="banner">
                <div class="container">
                    <h1 class="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div class="container page">
                <div class="row">

                    <div class="col-md-9">
                        <div class="feed-toggle">
                            <ul class="nav nav-pills outline-active">
                                <li class="nav-item" v-if="user">
                                    <nuxt-link
                                        class="nav-link"
                                        :class="{
                                            active: tab === 'your_feed'
                                        }"
                                        exact
                                        :to="{
                                            name: 'home',
                                            query: {
                                                tab: 'your_feed'
                                            }
                                        }"
                                    >Your Feed</nuxt-link>
                                </li>
                                <li class="nav-item">
                                    <nuxt-link
                                        class="nav-link"
                                        :class="{
                                            active: tab === 'global_feed'
                                        }"
                                        exact
                                        :to="{
                                            name: 'home',
                                            query: {
                                                tab: 'global_feed'
                                            }
                                        }"
                                    >Global Feed</nuxt-link>
                                </li>
                                <li class="nav-item" v-if="tag">
                                    <nuxt-link
                                        class="nav-link"
                                        :class="{
                                            active: tab === 'tag'
                                        }"
                                        exact
                                        :to="{
                                            name: 'home',
                                            query: {
                                                tab: 'tag',
                                                tag: tag
                                            }
                                        }"
                                    >#{{ tag }}</nuxt-link>
                                </li>
                            </ul>
                        </div>

                        <div 
                            class="article-preview"
                            v-for="article in articles"
                            :key="article.slug"
                        >
                            <div class="article-meta">
                                <!-- <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a> -->
                                <nuxt-link 
                                    to="{
                                        name: 'profile',
                                        params: {
                                            username: article.author.username
                                        }
                                    }"
                                >
                                    <img :src="article.author.image" />
                                </nuxt-link>
                                <div class="info">
                                    <!-- <a
                                        href=""
                                        class="author"
                                    >Eric Simons</a> -->
                                    <nuxt-link 
                                        to="{
                                            name: 'profile',
                                            params: {
                                                username: article.author.username
                                            }
                                        }"
                                    >
                                        {{ article.author.username }}
                                    </nuxt-link>
                                    <span class="date">{{ article.createdAt}}</span>
                                </div>
                                <button 
                                    class="btn btn-outline-primary btn-sm pull-xs-right"
                                    :class="{
                                        active: article.favorited
                                    }"
                                >
                                    <i class="ion-heart"></i> {{ article.favoritesCount }}
                                </button>
                            </div>
                            <nuxt-link
                                :to="{
                                    name: 'article',
                                    params: {
                                        slug: article.slug
                                    }
                                }"
                                class="preview-link"
                            >
                                <h1>{{ article.title }}</h1>
                                <p>{{ article.description }}</p>
                                <span>Read more...</span>
                            </nuxt-link>
                        </div>

                        <!-- 分页列表 -->
                        <nav>
                            <ul class="pagination">
                                <li
                                    class="page-item"
                                    :class="{
                                        active: item === page
                                    }"
                                    v-for="item in totalPage"
                                    :key="item"
                                >
                                    <nuxt-link
                                        class="page-link"
                                        :to="{
                                            name: 'home',
                                            query: {
                                                page: item,
                                                tag: $route.query.tag,
                                                tab: tab
                                            }
                                        }"
                                    >{{ item }}</nuxt-link>
                                </li>
                            </ul>
                        </nav>

                    </div>

                    <div class="col-md-3">
                        <div class="sidebar">
                            <p>Popular Tags</p>

                            <div class="tag-list">
                                <nuxt-link
                                    :to="{
                                        name: 'home',
                                        query: {
                                            tag: item,
                                            tab: 'tag'
                                        }
                                    }"
                                    class="tag-pill tag-default"
                                    v-for="item in tags"
                                    :key="item"
                                >{{ item }}</nuxt-link> 
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
    name: "HomePage",
    async asyncData ({ query }) {
        const page = Number.parseInt(query.page || 1)
        const limit = 5
        const { tag } = query

        const [ articlesRes, tagRes ] = await Promise.all([
            // 获取文章列表
            getArticles({
                limit,
                offset: (page - 1) * limit,
                tag
            }),
            // 获取文章标签列表
            getTags()
        ])

        const { articles, articlesCount} = articlesRes.data
        const { tags } = tagRes.data

        return {
            articles,
            articlesCount,
            limit,
            page,
            tags,
            tag,
            tab: query.tab || 'global_feed'
        }   
    },
    watchQuery: ['page', 'tag', 'tab'], // 监听参数字符串更改并在更改时执行组件方法
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        }
    }
}
</script>

<style lang="scss">
</style>