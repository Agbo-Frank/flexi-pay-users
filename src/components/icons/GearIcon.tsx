import Iicon from "./interface";

export function GearIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.755 0C11.551 0 12.2718 0.442105 12.6698 1.09474C12.8634 1.41053 12.9925 1.8 12.9603 2.21053C12.9387 2.52632 13.0356 2.84211 13.2077 3.13684C13.7563 4.03158 14.9719 4.36842 15.9185 3.86316C16.9835 3.25263 18.3282 3.62105 18.9414 4.66316L19.6621 5.90526C20.2861 6.94737 19.9418 8.28421 18.8661 8.88421C17.9517 9.42105 17.629 10.6105 18.1776 11.5158C18.3497 11.8 18.5434 12.0421 18.8446 12.1895C19.2211 12.3895 19.5115 12.7053 19.7159 13.0211C20.114 13.6737 20.0817 14.4737 19.6944 15.1789L18.9414 16.4421C18.5434 17.1158 17.8011 17.5368 17.0373 17.5368C16.6608 17.5368 16.2413 17.4316 15.897 17.2211C15.6173 17.0421 15.2946 16.9789 14.9504 16.9789C13.8854 16.9789 12.9925 17.8526 12.9603 18.8947C12.9603 20.1053 11.9706 21.0526 10.7335 21.0526H9.27045C8.02258 21.0526 7.0329 20.1053 7.0329 18.8947C7.01138 17.8526 6.11852 16.9789 5.05353 16.9789C4.69853 16.9789 4.37581 17.0421 4.10687 17.2211C3.76263 17.4316 3.33234 17.5368 2.96658 17.5368C2.19205 17.5368 1.44978 17.1158 1.05176 16.4421L0.309495 15.1789C-0.088531 14.4947 -0.110046 13.6737 0.28798 13.0211C0.460099 12.7053 0.782822 12.3895 1.14858 12.1895C1.44978 12.0421 1.64342 11.8 1.82629 11.5158C2.36417 10.6105 2.04144 9.42105 1.12706 8.88421C0.0620733 8.28421 -0.282165 6.94737 0.331009 5.90526L1.05176 4.66316C1.67569 3.62105 3.00961 3.25263 4.08536 3.86316C5.02126 4.36842 6.23685 4.03158 6.78548 3.13684C6.9576 2.84211 7.05441 2.52632 7.0329 2.21053C7.01138 1.8 7.12972 1.41053 7.33411 1.09474C7.73213 0.442105 8.45288 0.0210526 9.23818 0H10.755ZM10.0127 7.55789C8.32379 7.55789 6.9576 8.88421 6.9576 10.5368C6.9576 12.1895 8.32379 13.5053 10.0127 13.5053C11.7016 13.5053 13.0356 12.1895 13.0356 10.5368C13.0356 8.88421 11.7016 7.55789 10.0127 7.55789Z" fill={color}/>
    </svg>
  );
}

export default GearIcon;