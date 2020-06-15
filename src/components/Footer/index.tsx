import React from 'react';

interface IFooter {
  author: string;
}

const Footer: React.FC<IFooter> = ({ author }) => {
  return (
    <footer style={{ paddingTop: '50px', textAlign: 'center' }}>
      © {author}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  );
};

export default Footer;
