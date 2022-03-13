const { createFilePath } = require('gatsby-source-filesystem');
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog-posts/"}}) {
        nodes {
          frontmatter {
            tags
            date(formatString: "YYYY/MM/DD")
            draft
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  const publishedPosts = data.allMarkdownRemark.nodes
    .filter((node) => node.frontmatter.draft !== true);

  // create each pages
  publishedPosts.forEach((node) => {
    const dateForPath = node.frontmatter.date;
    const slug = node.fields.slug;
    const path = `${dateForPath}${slug}`;
    actions.createPage({
      path,
      component: require.resolve(`${__dirname}/src/pages/detail.tsx`),
      context: { slug },
    });
  });

  // create tag filter result
  const tags = [];
  publishedPosts.forEach((node) => {
    node.frontmatter.tags && node.frontmatter.tags.forEach((tag) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });

  tags.forEach((tag) => {
    const path = `tag/${tag}`;
    actions.createPage({
      path,
      component: require.resolve(`${__dirname}/src/pages/index.tsx`),
      context: { tag },
    });
  });

  // create about me page
  actions.createPage({
    path: 'aboutme',
    component: require.resolve(`${__dirname}/src/pages/aboutme.tsx`),
  });
};
