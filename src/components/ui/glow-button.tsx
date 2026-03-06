"use client";

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  label?: string;
  onClick?(): void;
  className?: string;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ label = "Book a call", onClick, className }, ref) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
      onClick?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn("glow-btn", className)}
        onClick={handleClick}
        data-state={isClicked ? "clicked" : undefined}
      >
        {label}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
