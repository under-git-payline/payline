import React from 'react';

type CloverFlexIconProps = React.SVGProps<SVGSVGElement>;

const CloverFlexIcon = (props: CloverFlexIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor"/>
    <rect x="4" y="6" width="16" height="12" rx="1" fill="#fff"/>
    <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
    <rect x="6" y="13" width="12" height="2" rx="1" fill="currentColor"/>
    <path d="M12 16L14 18H10L12 16Z" fill="currentColor"/>
  </svg>
);

export default CloverFlexIcon;
