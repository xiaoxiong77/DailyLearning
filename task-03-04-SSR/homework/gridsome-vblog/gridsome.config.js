// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Dominguito-Blog",
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['posts'],
        singleTypes: ['general'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: '',
          password: ''
        }
      }
    }
  ],
  templates: {
    Followers: [
      {
        name: 'SocialDetail',
        path: "/social/detail/:login",
        component: "./src/templates/SocialDetail.vue",
      },
    ],
    Repos: [
      {
        name: 'Repos',
        path: "/repo/detail/:name",
        component: "./src/templates/Repo.vue",
      },
    ],
    StrapiPosts: [
      {
        name: 'post',
        path: "/blogs/detail/:id",
        component: "./src/templates/Blog.vue",
      },
    ]
  },
};
