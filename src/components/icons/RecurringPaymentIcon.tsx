import React from 'react';

type RecurringPaymentIconProps = React.SVGProps<SVGSVGElement>;

const RecurringPaymentIcon = (props: RecurringPaymentIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z" fill="currentColor"/>
    <path d="M13 7V11.59L16.2 14.79L15.08 15.91L11.5 12.34V7H13Z" fill="currentColor"/>
    <path d="M8 16L6 18L8 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M16 8L18 6L16 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

export default RecurringPaymentIcon;
