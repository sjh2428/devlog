import React from 'react';
import Layout from '../components/layout';
import { ReplaceComponentRendererArgs } from 'gatsby';

interface ITemplateProps<T> {
  pageContext: ReplaceComponentRendererArgs['props'] & T;
}

interface IPostTemplateProps {
  html: string;
  title: string;
  category: string;
  date: string;
}

const PostTemplate: React.FC<ITemplateProps<IPostTemplateProps>> = React.memo((props) => {
  return (
    <Layout>
      <code>
        <pre>{JSON.stringify(props, null, 4)}</pre>
      </code>
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
