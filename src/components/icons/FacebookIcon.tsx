import Iicon from "./interface";
import { FLEXIPAY_FACEBOOK } from '../../utils/constants'

export function FacebookIcon({ size, color}: Iicon): JSX.Element {
    return (
        <a href={FLEXIPAY_FACEBOOK} target="_blank">
            <svg width={`${size || 47}`} height={`${size || 46}`} viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.1831 23.2725C46.1831 10.7205 36.0077 0.545185 23.4558 0.545185C10.9039 0.545185 0.728516 10.7205 0.728516 23.2725C0.728516 34.6163 9.03955 44.0186 19.9047 45.7236V29.8421H14.1341V23.2725H19.9047V18.2654C19.9047 12.5693 23.2977 9.42303 28.4891 9.42303C30.9756 9.42303 33.5765 9.86692 33.5765 9.86692V15.46H30.7107C27.8874 15.46 27.0069 17.2119 27.0069 19.0092V23.2725H33.3102L32.3026 29.8421H27.0069V45.7236C37.872 44.0186 46.1831 34.6163 46.1831 23.2725Z" fill={`${color || "#1877F2"}`}/>
            </svg>
        </a>
    );
  }
  
  export default FacebookIcon;