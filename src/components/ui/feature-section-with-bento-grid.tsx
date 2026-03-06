"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface BentoCardProps {
  className?: string
  title: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
  wide?: boolean
  glowVariant?: "default" | "white" | "emerald"
}

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3", className)}>
      {children}
    </div>
  )
}

export function BentoCard({
  className,
  title,
  description,
  icon: Icon,
  children,
  wide,
  glowVariant,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-6 flex flex-col gap-3 group",
        wide && "md:col-span-2",
        className
      )}
    >
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={60}
        inactiveZone={0.01}
        borderWidth={1}
        variant={glowVariant ?? "default"}
      />
      {Icon && (
        <div className="w-8 h-8 rounded-lg bg-zinc-800/60 flex items-center justify-center">
          <Icon className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300" />
        </div>
      )}
      <div>
        <h3 className="text-sm font-medium text-zinc-200 mb-1">{title}</h3>
        {description && <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>}
      </div>
      {children}
    </div>
  )
}
