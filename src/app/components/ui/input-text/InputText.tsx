"use client";

import { useEffect, useState } from "react";

interface InputTextProps {
  id?: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  monetary?: boolean;
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
}

export default function InputText({
  id,
  name,
  label,
  placeholder,
  type="text",
  monetary = false,
  className = '',
  value,
  onChange,
}: InputTextProps) {
  // const [value, setValue] = useState("");
//   const [internalValue, setInternalValue] = useState("");

//   useEffect(() => {
//     if (value === undefined || value === null) {
//       setInternalValue("");
//       return;
//     }

//     if (monetary) {
//       // Converte number para string no formato "123,45"
//       const str = value.toFixed(2).replace(".", ",");
//       setInternalValue(str);
//     } else {
//       // Apenas número inteiro
//       setInternalValue(value.toString());
//     }
//   }, [value, monetary]);

//   const formatMonetary = (input: string) => {
//     const digits = input.replace(/\D/g, ""); 
//     const number = (parseInt(digits || "0", 10) / 100).toFixed(2);
//     return number.replace(".", ",");
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const input = e.target.value;

//     if (monetary) {
//       const formatted = formatMonetary(input);
//       setInternalValue(formatted);
//       const numeric = parseFloat(formatted.replace(",", ".")) || 0;
//       onChange?.(numeric);
//     } else {
//       const digits = input.replace(/\D/g, "");
//       setInternalValue(digits);
//       const numeric = parseInt(digits, 10) || 0;
//       onChange?.(numeric);
//     }
//   };

  return (
    <div className={'flex flex-col gap-[16px] ' + className}>
      {label && (
        <label htmlFor={id} className="text-md text-black font-bold">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        className="border border-primary rounded-default py-[11px] px-[16px] bg-white focus:outline-none focus:ring-0"
      />
    </div>
  );
}
