import React from 'react';

interface CardProps {
 children: React.ReactNode;
 className?: string;
 onClick?: () => void;
 hover?: boolean;
}

export function Card({ children, className = '', onClick, hover }: CardProps) {
 return (
 <div
 onClick={onClick}
 className={`bg-card border border-border rounded-xl shadow-sm ${hover ? 'hover:shadow-md hover:border-[#5ABCB9]/40 transition-all duration-200 cursor-pointer' : ''} ${className}`}
 >
 {children}
     </div>
     );
}
