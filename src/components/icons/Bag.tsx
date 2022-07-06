import Iicon from "./interface";

export function BagIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0055 0C12.9832 0 15.4313 2.3399 15.5556 5.3048H15.5265C15.53 5.39099 15.5134 5.47681 15.4781 5.55556H15.6516C17.0038 5.55556 18.4198 6.49279 18.9876 8.75534L19.0493 9.0223L19.9036 15.9053C20.5184 20.2953 18.1166 22.1414 14.8402 22.2196L14.6205 22.2222H5.40948C2.07975 22.2222 -0.486062 21.0089 0.0780898 16.2039L0.116561 15.9053L0.98071 9.0223C1.40682 6.58576 2.83734 5.62472 4.21569 5.55918L4.36857 5.55556H4.45543C4.44078 5.47261 4.44078 5.38775 4.45543 5.3048C4.57969 2.3399 7.02777 0 10.0055 0ZM6.77444 9.25477C6.2321 9.25477 5.79245 9.70728 5.79245 10.2655C5.79245 10.8237 6.2321 11.2762 6.77444 11.2762C7.31678 11.2762 7.75643 10.8237 7.75643 10.2655L7.74878 10.1387C7.68818 9.64034 7.27506 9.25477 6.77444 9.25477ZM13.2065 9.25477C12.6641 9.25477 12.2245 9.70728 12.2245 10.2655C12.2245 10.8237 12.6641 11.2762 13.2065 11.2762C13.7488 11.2762 14.1885 10.8237 14.1885 10.2655C14.1885 9.70728 13.7488 9.25477 13.2065 9.25477ZM9.96194 1.44709C7.82404 1.44709 6.09093 3.17425 6.09093 5.3048C6.10558 5.38775 6.10558 5.47261 6.09093 5.55556H13.8813C13.8504 5.47549 13.834 5.39059 13.833 5.3048C13.833 3.17425 12.0998 1.44709 9.96194 1.44709Z" fill={color}/>
    </svg>
  );
}

export default BagIcon;