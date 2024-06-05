import { IconProps } from "@/model/types";
import React from "react";

export default function Users(props: IconProps) {
  const { className, size = 20 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="white"
      className={className}
    >
      <path
        d="M10 3.62848C10.6108 2.93646 11.5044 2.5 12.5 2.5C14.341 2.5 15.8333 3.99238 15.8333 5.83333C15.8333 7.67428 14.341 9.16667 12.5 9.16667C11.5044 9.16667 10.6108 8.7302 10 8.03819M12.5 17.5H2.5V16.6667C2.5 13.9052 4.73858 11.6667 7.5 11.6667C10.2614 11.6667 12.5 13.9052 12.5 16.6667V17.5ZM12.5 17.5H17.5V16.6667C17.5 13.9052 15.2614 11.6667 12.5 11.6667C11.5893 11.6667 10.7354 11.9102 10 12.3356M10.8333 5.83333C10.8333 7.67428 9.34095 9.16667 7.5 9.16667C5.65905 9.16667 4.16667 7.67428 4.16667 5.83333C4.16667 3.99238 5.65905 2.5 7.5 2.5C9.34095 2.5 10.8333 3.99238 10.8333 5.83333Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
