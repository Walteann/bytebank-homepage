"use client";

import { InputHTMLAttributes, useState } from "react";

interface InputCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string | undefined;
}

export default function InputCheckbox({
	label,
	error,
}: InputCheckboxProps) {
	const [checked, setChecked] = useState(false);

	return (
		<div>
			<label className="flex items-center gap-[16px] cursor-pointer select-none">
				<input
					type="checkbox"
					checked={checked}
					onChange={() => setChecked(!checked)}
					className="peer hidden"
				/>
				<span
					className={`
          w-[24px] h-[24px] flex items-center justify-center rounded border-2 w-max-fit
          ${checked ? "bg-success border-success" : "border-success"}
          peer-focus:ring-2 peer-focus:ring-green-300
          transition-colors
		  `}
				>
					{checked && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-[24px] h-[24px]  text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					)}
				</span>
				<span className="w-[250px] md:w-[400px] text-md font-regular">
					{label} - {checked}
				</span>
			</label>
			{error && (
				<span className="text-error text-sm pt-[8px]">{error}</span>
			)}
		</div>
	);
}
