import React from 'react';
import './AdvancedButton.css';

export type ButtonVariant = 'default' | 'disabled' | 'border' | 'solid' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

interface AdvancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

export const AdvancedButton: React.FC<AdvancedButtonProps> = ({
  variant = 'default',
  size = 'small',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClass = () => {
    if (disabled) return 'btn--disabled';
    
    switch (variant) {
      case 'border':
        return 'btn--border';
      case 'solid':
        return 'btn--solid';
      case 'ghost':
        return 'btn--ghost';
      case 'danger':
        return 'btn--danger';
      case 'success':
        return 'btn--success';
      case 'warning':
        return 'btn--warning';
      case 'info':
        return 'btn--info';
      default:
        return 'btn--default';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'btn--small';
      case 'large':
        return 'btn--large';
      default:
        return 'btn--medium';
    }
  };

  return (
    <button
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
