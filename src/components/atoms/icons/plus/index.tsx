import React from 'react';
import { IconProps } from '../../../../model/types/icon.props';

export default function Plus(props: IconProps) {
  const { size = 20, className } = props;
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path 
        d="M10 5V10M10 10V15M10 10H15M10 10L5 10"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}