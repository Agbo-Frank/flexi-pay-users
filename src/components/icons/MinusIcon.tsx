import Iicon from "./interface";

export function MinusIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size}viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2.14293C18 2.93293 17.9315 3.5715 17.1415 3.5715H1.71575C0.927178 3.5715 0.857178 2.93293 0.857178 2.14293C0.857178 1.35293 0.927178 0.714355 1.71575 0.714355H17.1429C17.9315 0.714355 18 1.35293 18 2.14293Z" fill={color} />
    </svg>
  );
}

export default MinusIcon;