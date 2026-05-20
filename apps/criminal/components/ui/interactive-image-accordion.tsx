import React, { useState } from 'react';
import Image from 'next/image';

export interface AccordionItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface AccordionPanelProps {
  item: AccordionItem;
  isActive: boolean;
  onMouseEnter: () => void;
  priority?: boolean;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ item, isActive, onMouseEnter, priority }) => {
  return (
    <div
      className={`
        relative h-[480px] sm:h-[560px] lg:h-[640px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out flex-shrink-0
        ${
          isActive
            ? 'w-[340px] sm:w-[420px] lg:w-[460px] ring-1 ring-white/15 shadow-2xl shadow-black/50'
            : 'w-[96px] sm:w-[108px] lg:w-[120px]'
        }
      `}
      onMouseEnter={onMouseEnter}
    >
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 340px, 400px"
        priority={priority}
        className="object-contain object-center"
      />
      {/* Gradient overlay — heavier on inactive, lighter on active */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isActive
            ? 'bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent'
            : 'bg-navy-900/70'
        }`}
      />

      {/* Title — horizontal when active, vertical when collapsed */}
      {isActive ? (
        <span className="absolute bottom-6 left-6 right-6 font-bold text-white text-[18px] sm:text-[20px] lg:text-[22px] tracking-[-0.3px] leading-tight transition-all duration-500 ease-out">
          {item.title}
        </span>
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-bold text-white/90 text-[12px] sm:text-[13px] tracking-[0.05em] whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
          >
            {item.title}
          </span>
        </span>
      )}

      {/* Active-only gold underline accent */}
      {isActive && (
        <span
          className="absolute bottom-3 left-6 h-[2px] w-8 bg-gold-400"
          aria-hidden
        />
      )}
    </div>
  );
};

interface InteractiveImageAccordionProps {
  items: AccordionItem[];
  defaultActiveIndex?: number;
  className?: string;
}

export function InteractiveImageAccordion({
  items,
  defaultActiveIndex = 0,
  className = '',
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  return (
    <div className={`flex flex-row items-center gap-3 sm:gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory [&>*]:snap-start max-w-full ${className}`}>
      {items.map((item, index) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isActive={index === activeIndex}
          priority={index === defaultActiveIndex}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
}
