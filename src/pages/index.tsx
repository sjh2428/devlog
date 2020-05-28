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
            subPath
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
      <h3>최근 작성한 게시글 목록</h3>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const path = `${node.frontmatter?.category}/${node.frontmatter?.subPath}`;
          return (
            <li key={node.id}>
              <Link to={path}>
                <h2>{node.frontmatter?.title}</h2>
                <p>{node.frontmatter?.date}</p>
                <p>{node.excerpt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default IndexPage;
