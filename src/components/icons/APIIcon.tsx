import React from 'react';

type APIIconProps = React.SVGProps<SVGSVGElement>;

const APIIcon = (props: APIIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M8 3L4 9L8 15V11H12V9H8V3Z" fill="currentColor"/>
    <path d="M16 21L20 15L16 9V13H12V15H16V21Z" fill="currentColor"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

export default APIIcon;
