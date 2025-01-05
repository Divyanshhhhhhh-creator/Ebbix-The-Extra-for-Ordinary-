import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
                    children,
                    className = '',
                    variant = 'default',
                    size = 'md',
                    isLoading = false,
                    disabled = false,
                    icon: Icon,
                    onClick,
                    type = 'button',
                    ...props
                }) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        default: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600',
        secondary: 'bg-white/10 text-blue-200 hover:bg-white/20 border border-blue-400/20',
        outline: 'border border-blue-400 text-blue-400 hover:bg-blue-400/10',
        ghost: 'text-blue-400 hover:bg-blue-400/10',
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
    };

    const sizeClasses = sizes[size] || sizes.md;
    const variantClasses = variants[variant] || variants.default;

    return (
        <button
            type={type}
            className={`
        ${baseStyles}
        ${sizeClasses}
        ${variantClasses}
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
            disabled={disabled || isLoading}
            onClick={onClick}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                <>
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;