import React from 'react';

const Footer = ({ author }) => {
  return (
    <footer style={{ paddingTop: '50px', textAlign: 'center' }}>
      © {author}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  );
};

export default Footer;
