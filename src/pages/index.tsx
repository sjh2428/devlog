import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Query } from '../../graphql-types';

const LatestPostListQuery = graphql`
  query LatestPostListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 200)
          frontmatter {
            title
            path
            category
            date(formatString: "YYYY-MM-DD HH:mm:ss")
          }
          id
        }
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);
  return (
    <Layout>
      <SEO title="Home" />
      <h1>최근 작성한 게시글 목록</h1>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const path = `${node.frontmatter?.category}/${node.frontmatter?.path}`;
          return (
            <li key={node.id}>
              <h2>
                <Link to={path}>{node.frontmatter?.title}</Link>
              </h2>
              <h3>{node.frontmatter?.date}</h3>
              <p>{node.excerpt}</p>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default IndexPage;
