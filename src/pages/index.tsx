import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Query } from '../../graphql-types';
import './index.css';

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
            date(formatString: "YYYY-MM-DD HH:mm")
          }
          id
        }
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const data = useStaticQuery<Query>(LatestPostListQuery);
  const { edges } = data.allMarkdownRemark;

  const categorySet: Set<string> = new Set();
  edges.forEach(({ node }) => {
    if (node.frontmatter && node.frontmatter.category) {
      node.frontmatter.category.forEach((v) => {
        if (v) {
          categorySet.add(v.toLowerCase());
        }
      });
    }
  });

  return (
    <Layout>
      <SEO title="Home" />
      <ul className="category-ul">
        {Array.from(categorySet).map((category) => {
          return <li className="category-li">{category}</li>;
        })}
      </ul>
      <ul className="post-ul">
        {edges.map(({ node }) => {
          const path = `${node.frontmatter?.subPath}`;
          return (
            <Link key={node.id} to={path} className="post-link">
              <li className="post-li">
                <h2 className="post-title">{node.frontmatter?.title}</h2>
                <p className="post-date">{node.frontmatter?.date}</p>
                <p className="post-excerpt">{node.excerpt}</p>
                <span className="post-border border-left-top-to-left-down"></span>
                <span className="post-border border-left-top-to-right-top"></span>
                <span className="post-border border-right-down-to-left-down"></span>
                <span className="post-border border-right-down-to-right-top"></span>
              </li>
            </Link>
          );
        })}
      </ul>
    </Layout>
  );
};

export default IndexPage;
