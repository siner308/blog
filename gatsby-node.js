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
query TagQuery {
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/blog-posts/"}, frontmatter: {draft: {ne: true}}}
  ) {
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

  // create each pages
  publishedPosts.forEach((node) => {
    const dateForPath = node.frontmatter.date;
    const slug = node.fields.slug;
    const path = `${dateForPath}${slug}`;
    actions.createPage({
      path,
      component: require.resolve(`${__dirname}/src/components/detail.tsx`),
      context: { slug },
    });
  });

  // create about me page
  actions.createPage({
    path: 'aboutme',
    component: require.resolve(`${__dirname}/src/components/aboutme.tsx`),
  });
};
