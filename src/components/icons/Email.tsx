import React from 'react';

type EmailProps = React.SVGProps<SVGSVGElement>;

const Email = (props: EmailProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path transform="translate(1.6666 3.3334)" d="M16.6667 1.66667C16.6667 0.75 15.9167 0 15 0H1.66667C0.75 0 0 0.75 0 1.66667V11.6667C0 12.5833 0.75 13.3333 1.66667 13.3333H15C15.9167 13.3333 16.6667 12.5833 16.6667 11.6667V1.66667ZM15 1.66667L8.33333 5.83333L1.66667 1.66667H15ZM15 11.6667H1.66667V3.33333L8.33333 7.5L15 3.33333V11.6667Z" fill={props.fill || "#010B24"}/>
  </svg>
);

export default Email;
