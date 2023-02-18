import './Footer.scss';

interface Props {}

const Footer = ({}) => {
  const date = new Date().toString();
  const year = date.split(' ')[3];
  const lastEditDate = date.replace(date.split(' ')[5], '');

  // use to gather date string
  // console.log(lastEditDate);

  return (
    <footer className="footer">
      <p className="footer-text">
        <a href="mailto: contact@kohnandrew.com">Andrew Kohn</a> ©{' '}
        <span>{year}</span> · All rights reserved
      </p>
      <p className="date">
        Latest Edit: Sat Feb 18 2023 02:20:33 (Central Standard Time)
      </p>
    </footer>
  );
};

export default Footer;
