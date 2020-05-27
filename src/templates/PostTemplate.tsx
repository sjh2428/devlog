import React from 'react';
import Layout from '../components/layout';
import { ReplaceComponentRendererArgs } from 'gatsby';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

interface ITemplateProps<T> {
  pageContext: ReplaceComponentRendererArgs['props'] & T;
}

interface IPostTemplateProps {
  html: string;
  title: string;
  category: string;
  date: string;
  subPath: string;
}

const PostTemplate: React.FC<ITemplateProps<IPostTemplateProps>> = React.memo((props) => {
  const { title, category, date, html } = props.pageContext;

  deckDeckGoHighlightElement();

  return (
    <Layout>
      <h2>
        {title} - {category}
      </h2>
      <h4>{date}</h4>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
