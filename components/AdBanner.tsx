'use client';

import { Ad } from '@/lib/ads';

type Props = {
  ad: Ad;
};

export default function AdBanner({ ad }: Props) {
  return (
    <a
      href={ad.link}
      className={`block col-span-2 md:col-span-3 lg:col-span-4 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r ${ad.backgroundColor}`}
    >
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="text-white">
          <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
            광고
          </span>
          <h3 className="text-lg md:text-xl font-bold mt-2">{ad.title}</h3>
          <p className="text-sm md:text-base text-white/90 mt-1">{ad.description}</p>
        </div>
        <div className="hidden md:block">
          <svg
            className="w-8 h-8 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
