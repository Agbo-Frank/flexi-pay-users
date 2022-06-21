import Iicon from "./interface";

function LogOutIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.13632 0C11.5257 0 13.4744 1.91528 13.4744 4.2733V8.88346H7.59892C7.17784 8.88346 6.8449 9.21069 6.8449 9.62455C6.8449 10.0288 7.17784 10.3656 7.59892 10.3656H13.4744V14.9662C13.4744 17.3242 11.5257 19.2491 9.11674 19.2491H4.34783C1.94869 19.2491 0 17.3338 0 14.9758V4.28292C0 1.91528 1.95848 0 4.35763 0H9.13632ZM15.9192 6.30427C16.2079 6.00591 16.6795 6.00591 16.9683 6.29465L19.7786 9.09539C19.923 9.23976 20 9.42262 20 9.62474C20 9.81723 19.923 10.0097 19.7786 10.1445L16.9683 12.9452C16.8239 13.0896 16.6314 13.1666 16.4485 13.1666C16.2561 13.1666 16.0636 13.0896 15.9192 12.9452C15.6305 12.6565 15.6305 12.1849 15.9192 11.8961L17.4591 10.3658H13.4746V8.88365H17.4591L15.9192 7.35335C15.6305 7.06461 15.6305 6.59301 15.9192 6.30427Z" fill={color}/>
    </svg>
  );
}

export default LogOutIcon;