import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export default function Check(props: Props) {
  const { size = 20, fill = '#111827', ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z'
        fillRule='evenodd'
        clipRule='evenodd'
        fill={fill}
      />
    </svg>
  );
}
