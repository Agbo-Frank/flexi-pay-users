import Iicon from "./interface";

export function WalletIcon({ size, color, line = false}: Iicon): JSX.Element {
  if(line){
    return (
      <svg width={size} height={size} viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17.25C5 15.5924 5.65848 14.0027 6.83058 12.8306C8.00269 11.6585 9.5924 11 11.25 11H48.75C50.4076 11 51.9973 11.6585 53.1694 12.8306C54.3415 14.0027 55 15.5924 55 17.25V32.875H5V17.25ZM40.9375 20.375C40.5231 20.375 40.1257 20.5396 39.8326 20.8326C39.5396 21.1257 39.375 21.5231 39.375 21.9375V25.0625C39.375 25.4769 39.5396 25.8743 39.8326 26.1674C40.1257 26.4604 40.5231 26.625 40.9375 26.625H47.1875C47.6019 26.625 47.9993 26.4604 48.2924 26.1674C48.5854 25.8743 48.75 25.4769 48.75 25.0625V21.9375C48.75 21.5231 48.5854 21.1257 48.2924 20.8326C47.9993 20.5396 47.6019 20.375 47.1875 20.375H40.9375ZM5 39.125V42.25C5 43.9076 5.65848 45.4973 6.83058 46.6694C8.00269 47.8415 9.5924 48.5 11.25 48.5H48.75C50.4076 48.5 51.9973 47.8415 53.1694 46.6694C54.3415 45.4973 55 43.9076 55 42.25V39.125H5Z" fill={color}/>
          <line x1="60" y1="2.12132" x2="2.12132" y2="60" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      </svg> 
    )
  }
  else{
    return(
      <svg width={size} height={size} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5156 0C17.9644 0 20 1.98459 20 5.3818H15.7689V5.41647C13.8052 5.41647 12.2133 6.96849 12.2133 8.883C12.2133 10.7975 13.8052 12.3495 15.7689 12.3495H20V12.6615C20 16.0154 17.9644 18 14.5156 18H5.48444C2.03556 18 0 16.0154 0 12.6615V5.33847C0 1.98459 2.03556 0 5.48444 0H14.5156ZM19.2533 6.87241C19.6657 6.87241 20 7.19834 20 7.60039V10.131C19.9952 10.5311 19.6637 10.8543 19.2533 10.8589H15.8489C14.8548 10.872 13.9855 10.2084 13.76 9.26432C13.6471 8.67829 13.8056 8.07357 14.1931 7.61222C14.5805 7.15087 15.1573 6.88007 15.7689 6.87241H19.2533ZM16.2489 8.04237H15.92C15.7181 8.04005 15.5236 8.11664 15.38 8.25504C15.2364 8.39344 15.1556 8.58213 15.1556 8.77901C15.1555 9.19205 15.4964 9.52823 15.92 9.53298H16.2489C16.6711 9.53298 17.0133 9.1993 17.0133 8.78767C17.0133 8.37605 16.6711 8.04237 16.2489 8.04237ZM10.3822 3.89119H4.73778C4.31903 3.89116 3.9782 4.2196 3.97333 4.62783C3.97333 5.04087 4.31415 5.37705 4.73778 5.3818H10.3822C10.8044 5.3818 11.1467 5.04812 11.1467 4.6365C11.1467 4.22487 10.8044 3.89119 10.3822 3.89119Z" fill={color}/>
      </svg>
    )
  }
}

export default WalletIcon;