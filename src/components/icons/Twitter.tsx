import React from 'react';

type TwitterProps = React.SVGProps<SVGSVGElement>;

const Twitter = (props: TwitterProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M20.25 20.3984L13.7975 10.7819L13.8085 10.7909L19.6264 3.89844H17.6822L12.9428 9.50844L9.17906 3.89844H4.08014L10.1042 12.8767L10.1035 12.8759L3.75 20.3984H5.6942L10.9633 14.1569L15.1511 20.3984H20.25ZM8.40873 5.39843L17.4621 18.8984H15.9214L6.86073 5.39843H8.40873Z" fill="#010B24"/>
  </svg>
);

export default Twitter;