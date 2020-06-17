import React from 'react';
import Layout from '../components/Layout';
import { ReplaceComponentRendererArgs } from 'gatsby';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import './PostTemplate.css';

interface ITemplateProps<T> {
  pageContext: ReplaceComponentRendererArgs['props'] & T;
}

interface IPostTemplateProps {
  html: string;
  title: string;
  date: string;
}

const PostTemplate: React.FC<ITemplateProps<IPostTemplateProps>> = React.memo((props) => {
  const { title, date, html } = props.pageContext;

  deckDeckGoHighlightElement();

  return (
    <Layout>
      <h2 className="title">{title}</h2>
      <p className="date">{date}</p>
      <hr />
      <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
