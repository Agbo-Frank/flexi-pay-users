import Iicon from "./interface";

export function QuestionIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 35 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 0C7.84412 0 0 7.84412 0 17.5C0 27.1559 7.84412 35 17.5 35H18.5294V41.1765C28.5353 36.3588 35 26.7647 35 17.5C35 7.84412 27.1559 0 17.5 0ZM19.5588 29.8529H15.4412V25.7353H19.5588V29.8529ZM19.5588 22.6471H15.4412C15.4412 15.9559 21.6176 16.4706 21.6176 12.3529C21.6176 10.0882 19.7647 8.23529 17.5 8.23529C15.2353 8.23529 13.3824 10.0882 13.3824 12.3529H9.26471C9.26471 7.80294 12.95 4.11765 17.5 4.11765C22.05 4.11765 25.7353 7.80294 25.7353 12.3529C25.7353 17.5 19.5588 18.0147 19.5588 22.6471Z" fill={color}/>
    </svg>
  );
}

export default QuestionIcon;