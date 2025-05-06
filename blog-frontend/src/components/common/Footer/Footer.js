import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Footer = () => (
  <footer className={cx('footer')}>
    <div className={cx('content')}>© 2025 Copyright - Saka Shingirai Madzudzo</div>
  </footer>
);

export default Footer;