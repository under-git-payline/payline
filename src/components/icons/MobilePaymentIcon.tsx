import React from 'react';

type MobilePaymentIconProps = React.SVGProps<SVGSVGElement>;

const MobilePaymentIcon = (props: MobilePaymentIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M17 1H7C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1 17 1ZM17 19H7V5H17V19Z" fill="currentColor"/>
    <circle cx="12" cy="21" r="1" fill="currentColor"/>
    <path d="M9 7H15V8H9V7Z" fill="currentColor"/>
    <path d="M9 9H15V10H9V9Z" fill="currentColor"/>
    <path d="M9 11H13V12H9V11Z" fill="currentColor"/>
    <path d="M9 13H11V14H9V13Z" fill="currentColor"/>
  </svg>
);

export default MobilePaymentIcon;
