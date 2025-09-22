import React from 'react';

type CloseProps = React.SVGProps<SVGSVGElement>;

const Close = (props: CloseProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
    <path d="M19 6.71603L17.59 5.30603L12 10.896L6.41 5.30603L5 6.71603L10.59 12.306L5 17.896L6.41 19.306L12 13.716L17.59 19.306L19 17.896L13.41 12.306L19 6.71603Z" fill="#CCCED3"/>
  </svg>
);

export default Close;