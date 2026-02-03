interface ButtonProps {
  value: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  value,
  type = 'button',
  className = '',
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    'rounded-default leading-none font-semibold text-md p-[15px] pl-[52px] pr-[52px] transition duration-300 ease-in-out';

  const defaultButton =
    'bg-primary hover:bg-accent hover:cursor-pointer text-white';
  const disabledClasses = 'bg-neutral-500 text-primary text-primary';

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${
        disabled ? disabledClasses : defaultButton
      } ${className}`}
    >
      {value}
    </button>
  );
}
