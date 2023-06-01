'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children: ReactNode;
  secondary?: boolean;
  primary?: boolean;
  error?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  secondary,
  primary,
  error,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
    flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer transition-colors duration-200 font-semibold hover:-translate-y-0.5
    `,
        primary ? 'bg-green-600 hover:bg-green-900' : null,
        secondary ? 'text-xs' : null
      )}
    >
      {children}
    </button>
  );
};

export default Button;
