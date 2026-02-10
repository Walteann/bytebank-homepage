'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  label: string;
  className?: string;
  error?: string | undefined;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ id, name, label, className = '', error, ...rest }, ref) => {
    return (
      <div className={'flex flex-col gap-[16px] ' + className}>
        {label && (
          <label htmlFor={id ?? name} className="text-md text-black font-bold">
            {label}
          </label>
        )}
        <div className="flex flex-col">
          <input
            ref={ref}
            id={id ?? name}
            name={name}
            className={`border rounded-default py-[11px] px-[16px] bg-white focus:outline-none focus:ring-0
          ${error ? 'border-error' : 'border-primary'}`}
            {...rest}
          />

          {error && (
            <span className="text-error text-sm pt-[8px]">{error}</span>
          )}
        </div>
      </div>
    );
  }
);

InputText.displayName = 'InputText';

export default InputText;
