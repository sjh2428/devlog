import { CreatePagesArgs } from 'gatsby';
import { Query } from '../../graphql-types';

module.exports.createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;
  const { data, errors } = await graphql<Query>(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              title
              category
              date
              path
            }
          }
        }
      }
    }
  `);

  if (errors) throw errors;

  if (data) {
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `${node.frontmatter?.category}/${node.frontmatter?.title}`,
        context: {
          html: node.html,
          title: node.frontmatter?.title,
          category: node.frontmatter?.category,
          date: node.frontmatter?.date,
          path: node.frontmatter?.path,
        },
        component: require('path').resolve(__dirname, '../templates/PostTemplate.tsx'),
      });
    });
  }
};
