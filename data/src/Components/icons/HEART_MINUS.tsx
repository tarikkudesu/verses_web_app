import React from "react";

interface Props {
  className?: string;
}
const HEART_MINUS: React.FC<Props> = ({ className }) => {
  return (
    <div className="inline-block">
		<svg
		  xmlns="http://www.w3.org/2000/svg"
		  width="24"
		  height="24"
		  viewBox="0 0 24 24"
		  fill="none"
		  stroke="currentColor"
		  strokeWidth="2"
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  className={className}
		>
		  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
		  <path d="M19.5 12.572l-2.494 2.47m-5.006 4.958l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
		  <path d="M16 19h6" />
		</svg>
    </div>
  );
};

export default HEART_MINUS;
