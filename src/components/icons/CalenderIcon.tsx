import Iicon from "./interface";

export function CalenderIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size}viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.83862 1.75408e-06C10.1688 -0.000773872 10.4299 0.255764 10.4307 0.597815L10.4315 1.18086C12.574 1.34877 13.9892 2.80871 13.9915 5.04759L14 11.601C14.0031 14.042 12.4695 15.5439 10.0114 15.5478L4.00703 15.5556C1.56427 15.5587 0.0115292 14.021 0.00845747 11.573L5.15464e-06 5.09656C-0.00306136 2.84291 1.3623 1.38686 3.50481 1.19019L3.50404 0.607144C3.50327 0.265093 3.75668 0.0077774 4.09457 0.0077774C4.43245 0.00700001 4.68587 0.263538 4.68664 0.605589L4.6874 1.14976L9.24886 1.14354L9.24809 0.59937C9.24732 0.257319 9.50074 0.000780904 9.83862 1.75408e-06ZM10.1519 11.0381H10.1443C9.79101 11.0467 9.50765 11.3429 9.51533 11.7005C9.5161 12.0581 9.801 12.3527 10.1542 12.3605C10.5144 12.3597 10.8062 12.0635 10.8054 11.6981C10.8054 11.3328 10.5129 11.0381 10.1519 11.0381ZM3.82426 11.0389C3.47102 11.0545 3.19456 11.3507 3.19533 11.7083C3.21146 12.0658 3.50327 12.3457 3.85651 12.3294C4.20285 12.3138 4.47853 12.0177 4.4624 11.6601C4.45472 11.3102 4.16983 11.0381 3.82426 11.0389ZM6.9881 11.035C6.63485 11.0514 6.35917 11.3468 6.35917 11.7044C6.3753 12.062 6.66711 12.341 7.02035 12.3255C7.36592 12.3092 7.64237 12.0138 7.62624 11.6554C7.61856 11.3063 7.33366 11.0343 6.9881 11.035ZM3.82042 8.24032C3.46718 8.25587 3.19149 8.55205 3.19226 8.90965C3.20762 9.26725 3.5002 9.54711 3.85344 9.53078C4.19901 9.51524 4.47469 9.21905 4.45856 8.86145C4.45088 8.51163 4.16675 8.23954 3.82042 8.24032ZM6.98503 8.21311C6.63178 8.22866 6.35533 8.52485 6.3561 8.88244C6.37146 9.24004 6.66404 9.51912 7.01728 9.50358C7.36284 9.48725 7.63853 9.19184 7.62317 8.83424C7.61472 8.48442 7.33059 8.21233 6.98503 8.21311ZM10.1489 8.217C9.79562 8.22477 9.51917 8.51241 9.51993 8.87001V8.87856C9.52761 9.23615 9.81943 9.50746 10.1734 9.49969C10.519 9.49114 10.7947 9.19495 10.787 8.83735C10.7709 8.4953 10.4937 8.21622 10.1489 8.217ZM9.25039 2.34072L4.68894 2.34694L4.68971 2.97585C4.68971 3.3109 4.43706 3.57521 4.09918 3.57521C3.76129 3.57599 3.50711 3.31246 3.50711 2.9774L3.50634 2.37881C2.00889 2.52885 1.18031 3.40885 1.18261 5.09501L1.18338 5.33677L12.8097 5.32123V5.04914C12.7767 3.37776 11.9381 2.50086 10.433 2.37026L10.4338 2.96885C10.4338 3.30313 10.1734 3.56822 9.84323 3.56822C9.50535 3.56899 9.25116 3.30468 9.25116 2.9704L9.25039 2.34072Z" fill={color}/>
    </svg>
  );
}

export default CalenderIcon;