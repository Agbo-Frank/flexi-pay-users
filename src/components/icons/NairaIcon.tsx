import Iicon from "./interface";

export function NairaIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0841 6.214V4.702H14.2841V0.399999H11.4041V8.068L5.12212 0.399999H2.71012V4.702H0.910117V6.214H2.71012V7.186H0.910117V8.698H2.71012V13H5.59012V5.332L11.8721 13H14.2841V8.698H16.0841V7.186H14.2841V6.214H16.0841Z" fill={color}/>
    </svg>
  );
}

export default NairaIcon;