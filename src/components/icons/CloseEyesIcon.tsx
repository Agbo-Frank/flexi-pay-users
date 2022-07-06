import Iicon from "./interface";

export function CloseEyesIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9643 8.19623C17.2789 6.40268 16.0838 4.84881 14.5262 3.72611L17.4002 0.846024L16.5542 0L0.599762 15.9545L1.44579 16.8005L4.50587 13.7464C5.87177 14.5425 7.41927 14.9743 9 15.0004C10.9557 14.9269 12.8471 14.2819 14.4402 13.1451C16.0334 12.0084 17.2585 10.4297 17.9643 8.60424C18.0119 8.47242 18.0119 8.32806 17.9643 8.19623ZM9 12.3003C8.17294 12.3 7.36768 12.0351 6.70193 11.5443L7.79997 10.4583C8.25526 10.7078 8.77916 10.8029 9.29308 10.7293C9.807 10.6558 10.2832 10.4177 10.6503 10.0506C11.0174 9.68347 11.2556 9.20724 11.3291 8.69332C11.4026 8.1794 11.3075 7.6555 11.0581 7.2002L12.1441 6.11417C12.5668 6.69475 12.8207 7.3809 12.8778 8.09679C12.9349 8.81267 12.7928 9.53039 12.4675 10.1706C12.1421 10.8108 11.646 11.3486 11.0341 11.7244C10.4221 12.1003 9.71815 12.2996 9 12.3003ZM2.11781 11.8863L5.11789 8.88625C5.10229 8.72475 5.09628 8.56246 5.09989 8.40024C5.10148 7.36635 5.51289 6.37527 6.24396 5.6442C6.97503 4.91313 7.96611 4.50171 9 4.50013C9.15845 4.50097 9.31672 4.51099 9.47401 4.53013L11.7421 2.26806C10.8594 1.96488 9.93331 1.80682 9 1.80005C7.04425 1.8736 5.15292 2.5186 3.55977 3.65536C1.96661 4.79211 0.741462 6.37077 0.0357458 8.19623C-0.0119153 8.32806 -0.0119153 8.47242 0.0357458 8.60424C0.496574 9.82986 1.20538 10.9472 2.11781 11.8863Z" fill={color}/>
    </svg>
  );
}

export default CloseEyesIcon;