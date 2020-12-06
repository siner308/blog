module.exports = {
  siteMetadata: {
    siteName: "Siner's Blog",
    githubUrl: 'https://github.com/siner308',
  },
  plugins: [
    // `gatsby-plugin-typescript` is automatically included in gatsby
    // You only need to explicitly define it here if you need to configure
    // specific options in it
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/blog-posts/posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-highlight-code',
          },
        ],
      },
    },
  ],
};
