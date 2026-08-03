import React from 'react';

type CopyLinkProps = React.SVGProps<SVGSVGElement>;

const CopyLink = (props: CopyLinkProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path transform="translate(2.0834 0.8334)" d="M11.6667 0H1.66667C0.75 0 0 0.75 0 1.66667V13.3333H1.66667V1.66667H11.6667V0ZM10.8333 3.33333H5C4.08333 3.33333 3.34167 4.08333 3.34167 5L3.33333 16.6667C3.33333 17.5833 4.075 18.3333 4.99167 18.3333H14.1667C15.0833 18.3333 15.8333 17.5833 15.8333 16.6667V8.33333L10.8333 3.33333ZM5 16.6667V5H10V9.16667H14.1667V16.6667H5Z" fill={props.fill || "#010B24"}/>
  </svg>
);

export default CopyLink;
