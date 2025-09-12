import React from 'react';

type POSTerminalIconProps = React.SVGProps<SVGSVGElement>;

const POSTerminalIcon = (props: POSTerminalIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M18 3H6C4.9 3 4 3.9 4 5V15C4 16.1 4.9 17 6 17H9L8 19V20H16V19L15 17H18C19.1 17 20 16.1 20 15V5C20 3.9 19.1 3 18 3ZM18 15H6V5H18V15Z" fill="currentColor"/>
    <rect x="7" y="7" width="10" height="6" rx="1" fill="currentColor"/>
    <circle cx="9" cy="9" r="1" fill="#fff"/>
    <circle cx="12" cy="9" r="1" fill="#fff"/>
    <circle cx="15" cy="9" r="1" fill="#fff"/>
    <circle cx="9" cy="11" r="1" fill="#fff"/>
    <circle cx="12" cy="11" r="1" fill="#fff"/>
    <circle cx="15" cy="11" r="1" fill="#fff"/>
  </svg>
);

export default POSTerminalIcon;
