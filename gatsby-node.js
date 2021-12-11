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
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  // create each pages
  data.allMarkdownRemark.nodes.forEach((node) => {
    const dateForPath = node.frontmatter.date;
    const slug = node.fields.slug;
    const path = `${dateForPath}${slug}`;
    actions.createPage({
      path,
      component: require.resolve(`${__dirname}/src/components/PostDetail.tsx`),
      context: { slug },
    });
  });

  // create tag filter result
  const tags = [];
  data.allMarkdownRemark.nodes.forEach((node) => {
    node.frontmatter.tags && node.frontmatter.tags.forEach((tag) => {
      if (!tags.includes(tag)) tags.push(tag);
    })
  })

  tags.forEach((tag) => {
    const path = `tag/${tag}`;
    actions.createPage({
      path,
      component: require.resolve(`${__dirname}/src/pages/index.tsx`),
      context: { tag },
    })
  })

  // create about me page
  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: 'aboutme',
      component: require.resolve(`${__dirname}/src/components/AboutMe.tsx`),
    });
  });
};
