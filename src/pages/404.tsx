import { Link, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import { isBrowser } from '../utils/browser';

const Error404Page: React.FC<PageProps> = () => {
  if (!isBrowser()) {
    return null;
  }

  const initialSeconds = 3;
  const [seconds, setSeconds] = React.useState(initialSeconds);

  setTimeout(() => {
    window.location.href = '/';
  }, initialSeconds * 1000);

  setInterval(() => {
    setSeconds(seconds - 1);
  }, 1000);

  return (
    <Layout title={'404 Not Found'} siteName={'메인 페이지로 이동'}>
      <h4>404 Not Found</h4>
      {seconds}초 후 <Link to={'/'}>메인 페이지</Link>로 이동합니다.
    </Layout>
  );
}

export default Error404Page;
