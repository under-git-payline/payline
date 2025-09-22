import React from 'react';

type CheckCircleProps = React.SVGProps<SVGSVGElement>;

const CheckCircle = (props: CheckCircleProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" {...props}>
    <path d="M12.5 2.30603C6.98 2.30603 2.5 6.78603 2.5 12.306C2.5 17.826 6.98 22.306 12.5 22.306C18.02 22.306 22.5 17.826 22.5 12.306C22.5 6.78603 18.02 2.30603 12.5 2.30603ZM10.5 17.306L5.5 12.306L6.91 10.896L10.5 14.476L18.09 6.88603L19.5 8.30603L10.5 17.306Z" fill="#2A7A5C"/>
  </svg>
);

export default CheckCircle;