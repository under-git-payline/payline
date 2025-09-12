import React from 'react';

type OnlinePaymentIconProps = React.SVGProps<SVGSVGElement>;

const OnlinePaymentIcon = (props: OnlinePaymentIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 2C13.1 2 14 2.9 14 4V6H16C17.1 6 18 6.9 18 8V20C18 21.1 17.1 22 16 22H8C6.9 22 6 21.1 6 20V8C6 6.9 6.9 6 8 6H10V4C10 2.9 10.9 2 12 2ZM16 20V8H8V20H16ZM12 4V6H12V4Z" fill="currentColor"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <path d="M9 15H15V16H9V15Z" fill="currentColor"/>
    <path d="M10 17H14V18H10V17Z" fill="currentColor"/>
  </svg>
);

export default OnlinePaymentIcon;
