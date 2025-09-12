import React from 'react';

type FacebookProps = React.SVGProps<SVGSVGElement>;

const Facebook = (props: FacebookProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
    <path d="M22 12.1484C22 6.62844 17.52 2.14844 12 2.14844C6.48 2.14844 2 6.62844 2 12.1484C2 16.9884 5.44 21.0184 10 21.9484V15.1484H8V12.1484H10V9.64844C10 7.71844 11.57 6.14844 13.5 6.14844H16V9.14844H14C13.45 9.14844 13 9.59844 13 10.1484V12.1484H16V15.1484H13V22.0984C18.05 21.5984 22 17.3384 22 12.1484Z" fill="#010B24"/>
  </svg>
);

export default Facebook;