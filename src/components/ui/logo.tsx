import React from 'react';

export function Logo({ className = "h-12", isLight = false }: { className?: string, isLight?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* L */}
      <path d="M15 8 L15 35" stroke="#1E3A8A" strokeWidth="8" strokeLinecap="round"/>
      
      {/* S */}
      <path d="M45 12 C35 8 28 12 28 18 C28 26 48 26 48 32 C48 38 40 42 32 38" stroke="#1E3A8A" strokeWidth="8" strokeLinecap="round"/>
      
      {/* Leaf */}
      <path d="M22 18 C22 18 30 2 45 4 C45 4 42 16 30 20 Z" fill="#10B981"/>
      <path d="M22 18 C28 14 35 10 42 6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Skyline Bars */}
      <rect x="10" y="28" width="4" height="14" rx="1" fill="#059669"/>
      <rect x="15" y="22" width="4" height="20" rx="1" fill="#059669"/>
      <rect x="20" y="26" width="4" height="16" rx="1" fill="#059669"/>
      <rect x="25" y="18" width="4" height="24" rx="1" fill="#059669"/>
      <rect x="30" y="24" width="4" height="18" rx="1" fill="#059669"/>
      <rect x="35" y="20" width="4" height="22" rx="1" fill="#059669"/>
      <rect x="40" y="28" width="4" height="14" rx="1" fill="#059669"/>
      <rect x="45" y="25" width="4" height="17" rx="1" fill="#059669"/>
      
      {/* Skyline Base */}
      <rect x="8" y="40" width="44" height="4" rx="2" fill="#059669"/>
    </svg>
  );
}
