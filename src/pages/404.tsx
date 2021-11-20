import { PageProps } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

const Error404Page: React.FC<PageProps> = () => (
  <Layout title={'404 Not Found ㅠㅠ'} siteName={'Click here to return home'}>
    <h4>404 Not Found</h4>
  </Layout>
);

export default Error404Page;
