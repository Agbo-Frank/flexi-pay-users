import Iicon from "./interface";

function PhoneIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 7 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4901 8.90165C3.48952 13.0579 0.614192 11.1256 0.613265 13.7713C0.612909 16.3226 0.135182 17.3114 3.36758 17.3109C3.73276 17.2712 6.97681 17.9424 6.97807 8.90172C6.97933 -0.140035 3.73509 0.528706 3.36992 0.48905C0.129136 0.488942 0.615535 1.47761 0.61518 4.02885C0.614811 6.67516 3.49068 4.74539 3.4901 8.90165Z" fill={`${color}`}/>
    </svg>
  );
}

export default PhoneIcon;