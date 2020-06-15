import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'gatsby';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Not Found Page</h2>
      <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}>
        Go Back
      </Link>
    </Layout>
  );
};

export default NotFoundPage;
