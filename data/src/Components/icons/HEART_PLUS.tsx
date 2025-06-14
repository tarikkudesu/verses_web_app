import React from "react";

interface Props {
  className?: string;
}
const HEART_PLUS: React.FC<Props> = ({ className }) => {
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
		  <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
		  <path d="M16 19h6" />
		  <path d="M19 16v6" />
		</svg>
    </div>
  );
};

export default HEART_PLUS;
