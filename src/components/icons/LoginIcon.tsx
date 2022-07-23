import Iicon from "./interface";

export function LoginIcon({ size, color}: Iicon): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 7.99998H6.5M6.5 7.99998L4.35714 10.1428M6.5 7.99998L4.35714 5.85713M1.5 3.71427V2.99998C1.5 2.6211 1.65051 2.25774 1.91842 1.98983C2.18633 1.72192 2.54969 1.57141 2.92857 1.57141H10.0714C10.4503 1.57141 10.8137 1.72192 11.0816 1.98983C11.3495 2.25774 11.5 2.6211 11.5 2.99998V13C11.5 13.3789 11.3495 13.7422 11.0816 14.0101C10.8137 14.278 10.4503 14.4286 10.0714 14.4286H2.92857C2.54969 14.4286 2.18633 14.278 1.91842 14.0101C1.65051 13.7422 1.5 13.3789 1.5 13V12.2857" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default LoginIcon;