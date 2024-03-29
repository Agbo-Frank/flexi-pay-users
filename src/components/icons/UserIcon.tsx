import React from "react";
import Iicon from "./interface";

export function UserIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={`${size}`} height={`${size}`}  viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 3.5C3.5 5.42967 5.07033 7 7 7C8.92967 7 10.5 5.42967 10.5 3.5C10.5 1.57033 8.92967 0 7 0C5.07033 0 3.5 1.57033 3.5 3.5ZM13.2222 14.7778H14V14C14 10.9986 11.557 8.55556 8.55556 8.55556H5.44444C2.44222 8.55556 0 10.9986 0 14V14.7778H13.2222Z" fill={`${color}`}/>
    </svg>
  );
}

export default UserIcon;