import React from 'react';

type StarProps = React.SVGProps<SVGSVGElement>;

const Star = (props: StarProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
    <path d="M12 18.3015L18.18 22.0315L16.54 15.0015L22 10.2715L14.81 9.66149L12 3.03149L9.19 9.66149L2 10.2715L7.46 15.0015L5.82 22.0315L12 18.3015Z" fill="#010B24"/>
  </svg>
);

export default Star;