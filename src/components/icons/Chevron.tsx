import React from 'react';

type ChevronProps = React.SVGProps<SVGSVGElement>;

const Chevron = (props: ChevronProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
    <path d="M15.705 7.94149L14.295 6.53149L8.29504 12.5315L14.295 18.5315L15.705 17.1215L11.125 12.5315L15.705 7.94149Z" fill="#010B24"/>
  </svg>
);

export default Chevron;