import React from 'react';

const Footer = () => {
  return (
    <footer style={{ paddingTop: '50px', textAlign: 'center' }}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  );
};

export default Footer;
