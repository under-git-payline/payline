import React from 'react';

type ArrowRightProps = React.SVGProps<SVGSVGElement>;

const ArrowRight = (props: ArrowRightProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" {...props}>
    <path d="M8.63503 2.93237L7.69503 3.87237L11.415 7.59904H3.3017V8.93237H11.415L7.69503 12.659L8.63503 13.599L13.9684 8.26571L8.63503 2.93237Z" fill={props.fill || "#0E172F"}/>
  </svg>
);

export default ArrowRight;