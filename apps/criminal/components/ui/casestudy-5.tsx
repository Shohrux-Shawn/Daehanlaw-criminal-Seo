import { MoveRight } from 'lucide-react';
import React from 'react';

interface CasestudyItem {
  logo?: React.ReactNode;
  company: string;
  tags: string;
  title: string;
  subtitle: string;
  image?: string;
  link?: string;
}

interface Casestudy5Props {
  featuredCasestudy: CasestudyItem;
  casestudies: CasestudyItem[];
  readMoreText?: string;
}

export const Casestudy5 = ({
  featuredCasestudy,
  casestudies,
  readMoreText = 'Read case study',
}: Casestudy5Props) => {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-border bg-background">
          <a
            href={featuredCasestudy.link || '#'}
            className="group grid gap-3 overflow-hidden px-4 transition-colors duration-500 ease-out hover:bg-muted/40 lg:grid-cols-2 xl:px-14 no-underline"
          >
            <div className="flex flex-col justify-between gap-3 pt-4 md:pt-8 lg:pb-8">
              <div className="flex items-center gap-2 text-base font-medium text-foreground">
                {featuredCasestudy.logo && (
                  <span className="inline-flex h-6 w-6 items-center justify-center text-[color:var(--gold-warm-deep)]">
                    {featuredCasestudy.logo}
                  </span>
                )}
                {featuredCasestudy.company}
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground sm:text-xs tracking-[0.12em] uppercase">
                  {featuredCasestudy.tags}
                </span>
                <h2 className="mt-2 mb-3 text-lg font-semibold text-balance sm:text-xl sm:leading-7 text-foreground tracking-tight">
                  {featuredCasestudy.title}
                  <span className="font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                    {' '}
                    {featuredCasestudy.subtitle}
                  </span>
                </h2>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {readMoreText}
                  <MoveRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            {featuredCasestudy.image && (
              <div className="relative isolate py-4 md:py-8">
                <div className="relative isolate h-full border border-border bg-background p-1.5">
                  <div className="h-full overflow-hidden">
                    <img
                      src={featuredCasestudy.image}
                      alt=""
                      className="aspect-[14/9] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            )}
          </a>

          <div className="flex border-t border-border">
            <div className="hidden w-14 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:10px_10px] opacity-15 xl:block" />
            <div className="grid lg:grid-cols-2 flex-1">
              {casestudies.map((item, idx) => (
                <a
                  key={item.company + idx}
                  href={item.link || '#'}
                  className={`group flex flex-col justify-between gap-6 border-border bg-background px-4 py-4 transition-colors duration-500 ease-out hover:bg-muted/40 md:py-8 lg:pb-8 xl:gap-8 no-underline ${
                    idx === 0
                      ? 'xl:border-l xl:pl-5'
                      : 'border-t lg:border-t-0 lg:border-l xl:border-r xl:pl-5'
                  }`}
                >
                  <div className="flex items-center gap-2 text-base font-medium text-foreground">
                    {item.logo && (
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[color:var(--gold-warm-deep)]">
                        {item.logo}
                      </span>
                    )}
                    {item.company}
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground sm:text-xs tracking-[0.12em] uppercase">
                      {item.tags}
                    </span>
                    <h2 className="mt-2 mb-3 text-lg font-semibold text-balance sm:text-xl sm:leading-7 text-foreground tracking-tight">
                      {item.title}
                      <span className="font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                        {' '}
                        {item.subtitle}
                      </span>
                    </h2>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {readMoreText}
                      <MoveRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="hidden w-14 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:10px_10px] opacity-15 xl:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
