import React from "react";
import Iicon from "./interface";

function MailIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9 0H2.1C1.54305 0 1.0089 0.221249 0.615076 0.615076C0.221249 1.0089 0 1.54305 0 2.1V9.1C0 9.65695 0.221249 10.1911 0.615076 10.5849C1.0089 10.9788 1.54305 11.2 2.1 11.2H11.9C12.457 11.2 12.9911 10.9788 13.3849 10.5849C13.7788 10.1911 14 9.65695 14 9.1V2.1C14 1.54305 13.7788 1.0089 13.3849 0.615076C12.9911 0.221249 12.457 0 11.9 0ZM11.9 1.4L7.35 4.529C7.24359 4.59044 7.12288 4.62278 7 4.62278C6.87712 4.62278 6.75641 4.59044 6.65 4.529L2.1 1.4H11.9Z" fill={`${color}`}/>
    </svg>
  );
}

export default MailIcon;