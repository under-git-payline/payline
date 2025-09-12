import React from 'react';

type HighRiskIconProps = React.SVGProps<SVGSVGElement>;

const HighRiskIcon = (props: HighRiskIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M12 7V17M7 12H17" stroke="#fff" strokeWidth="1.5"/>
  </svg>
);

export default HighRiskIcon;
