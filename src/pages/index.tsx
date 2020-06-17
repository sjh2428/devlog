import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Query, MarkdownRemarkEdge } from '../../graphql-types';
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
            date(formatString: "YYYY-MM-DD")
          }
          id
        }
      }
    }
  }
`;

interface IGetPosts {
  selectedCategoryState: object;
  edges: MarkdownRemarkEdge[];
}

const existSelected = (length: number) => length > 0;

const getPosts = ({ selectedCategoryState, edges }: IGetPosts) => {
  const selectedCategoryKeys = Object.keys(selectedCategoryState);
  let refinedEdges: MarkdownRemarkEdge[] = edges;
  if (
    existSelected(selectedCategoryKeys.length) &&
    selectedCategoryKeys.some((k) => selectedCategoryState[k])
  ) {
    refinedEdges = refinedEdges.filter(({ node }) =>
      node.frontmatter?.category?.some((category) =>
        category ? selectedCategoryState[category] : false,
      ),
    );
  }
  refinedEdges = refinedEdges.filter(({ node }) => node.frontmatter?.subPath !== 'about');
  return refinedEdges.map(({ node }) => {
    const path = `${node.frontmatter?.subPath}`;
    return (
      <Link key={node.id} to={`/${path}`} className="post-link">
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
  });
};

const IndexPage: React.FC = () => {
  const [selectedCategoryState, setSelectedCategoryState] = useState({});
  const data = useStaticQuery<Query>(LatestPostListQuery);
  const { edges } = data.allMarkdownRemark;

  const categorySet: Set<string> = new Set();
  edges.forEach(({ node }) => {
    if (node.frontmatter && node.frontmatter.category) {
      node.frontmatter.category.forEach((v) => {
        if (v) {
          categorySet.add(v);
        }
      });
    }
  });

  const categoryClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const { textContent } = e.currentTarget;
    if (textContent) {
      if (selectedCategoryState[textContent]) {
        setSelectedCategoryState({
          ...selectedCategoryState,
          [textContent]: !selectedCategoryState[textContent],
        });
      } else {
        setSelectedCategoryState({ ...selectedCategoryState, [textContent]: true });
      }
    }
  };

  return (
    <Layout>
      <SEO title="Home" />
      <ul className="category-ul">
        {Array.from(categorySet)
          .sort()
          .map((category) => {
            return (
              <li
                key={category}
                className={`category-li${selectedCategoryState[category] ? ' selected' : ''}`}
                onClick={categoryClickHandler}>
                {category}
              </li>
            );
          })}
      </ul>
      <ul className="post-ul">{getPosts({ selectedCategoryState, edges })}</ul>
    </Layout>
  );
};

export default IndexPage;
