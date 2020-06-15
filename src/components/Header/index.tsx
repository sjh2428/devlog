import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { COLOR } from '../../lib/constants';

interface IHeaderProps {
  siteTitle?: string;
}

const Header: React.FC<IHeaderProps> = ({ siteTitle }) => (
  <header
    style={{
      background: `${COLOR.MAIN}`,
      marginBottom: `1.45rem`,
    }}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 650,
        padding: `1rem 1.0875rem`,
      }}>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;