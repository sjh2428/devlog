import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';

const NotFoundPage = () => {
  return (
    <Layout>
      <h2>Not Found</h2>
      <Link to="/">Go Back</Link>
    </Layout>
  );
};

export default NotFoundPage;
