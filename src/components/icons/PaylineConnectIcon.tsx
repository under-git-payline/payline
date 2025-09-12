import React from 'react';

type PaylineConnectIconProps = React.SVGProps<SVGSVGElement>;

const PaylineConnectIcon = (props: PaylineConnectIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12Z" fill="currentColor"/>
    <path d="M12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="6" cy="12" r="2" fill="currentColor"/>
    <circle cx="18" cy="12" r="2" fill="currentColor"/>
    <circle cx="12" cy="6" r="2" fill="currentColor"/>
    <circle cx="12" cy="18" r="2" fill="currentColor"/>
  </svg>
);

export default PaylineConnectIcon;
