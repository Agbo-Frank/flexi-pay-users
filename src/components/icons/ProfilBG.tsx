import Iicon from "./interface";

export function ProfilBG({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16.4674C15.4233 16.4674 20 17.3487 20 20.7487C20 24.15 15.3933 25 10 25C4.57797 25 0 24.1187 0 20.7187C0 17.3174 4.60673 16.4674 10 16.4674ZM10 0C13.6739 0 16.6175 2.94253 16.6175 6.61382C16.6175 10.2851 13.6739 13.2289 10 13.2289C6.32737 13.2289 3.38252 10.2851 3.38252 6.61382C3.38252 2.94253 6.32737 0 10 0Z" fill={color}/>
    </svg>
  );
}

export default ProfilBG;