import React from 'react';

type ArrowDownProps = React.SVGProps<SVGSVGElement>;

const ArrowDown = (props: ArrowDownProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M13.825 6.9125L10 10.7292L6.175 6.9125L5 8.0875L10 13.0875L15 8.0875L13.825 6.9125Z" fill="#010B24"/>
  </svg>
);

export default ArrowDown;