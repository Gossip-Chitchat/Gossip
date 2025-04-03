import React, { ReactNode } from 'react';
import AnimatedElement from '@/components/ui-elements/AnimatedElement';

interface RoomCardProps {
  title: string;
  description: string;
  delay: number;
  children: ReactNode;
}

export function RoomCard({ title, description, delay, children }: RoomCardProps) {
  return (
    <AnimatedElement animation="slide-up" delay={delay} className="h-full">
      <div className="glass p-8 rounded-2xl h-full">
        <h2 className="text-xl font-display font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        {children}
      </div>
    </AnimatedElement>
  );
} 
