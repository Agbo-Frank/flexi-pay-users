import Iicon from "./interface";

export function SubscriptionIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10.1103V2.02206C18 0.909926 17.1 0 16 0H2C0.9 0 0 0.909926 0 2.02206V10.1103C0 11.2224 0.9 12.1324 2 12.1324H16C17.1 12.1324 18 11.2224 18 10.1103ZM9 9.09926C7.34 9.09926 6 7.74448 6 6.06618C6 4.38787 7.34 3.03309 9 3.03309C10.66 3.03309 12 4.38787 12 6.06618C12 7.74448 10.66 9.09926 9 9.09926ZM22 3.03309V14.1544C22 15.2665 21.1 16.1765 20 16.1765H3V14.1544H20V3.03309H22Z" fill={color}/>
    </svg>
  );
}

export default SubscriptionIcon;