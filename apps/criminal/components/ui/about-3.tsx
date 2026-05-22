import { Button } from '@/components/ui/button';

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: { src: string; alt: string };
  secondaryImage?: { src: string; alt: string };
  breakout?: {
    src?: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{ src: string; alt: string }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{ label: string; value: string }>;
}

export const About3 = ({
  title = 'About Us',
  description = '',
  mainImage,
  secondaryImage,
  breakout,
  companiesTitle,
  companies = [],
  
}: About3Props) => {
  return (
    <section className="pt-24 pb-14 sm:pt-36 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 grid gap-4 text-center md:grid-cols-2 md:text-left">
          <h2 className="text-4xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>

        {/* Image collage */}
        {(mainImage || secondaryImage || breakout) && (
          <div className="grid gap-5 lg:grid-cols-3">
            {mainImage && (
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                className="size-full max-h-[440px] rounded-xl object-cover lg:col-span-2"
              />
            )}
            <div className="flex flex-col gap-5 md:flex-row lg:flex-col">
              {breakout && (
                <div className="flex flex-col justify-between gap-4 rounded-xl bg-muted p-5 md:w-1/2 lg:w-auto">
                  {breakout.src && (
                    <img src={breakout.src} alt={breakout.alt} className="mr-auto h-9" />
                  )}
                  <div>
                    {breakout.title && (
                      <p className="mb-2 text-base font-semibold">{breakout.title}</p>
                    )}
                    {breakout.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{breakout.description}</p>
                    )}
                  </div>
                  {breakout.buttonText && breakout.buttonUrl && (
                    <Button variant="outline" size="sm" className="mr-auto" asChild>
                      <a href={breakout.buttonUrl}>{breakout.buttonText}</a>
                    </Button>
                  )}
                </div>
              )}
              {secondaryImage && (
                <img
                  src={secondaryImage.src}
                  alt={secondaryImage.alt}
                  className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
                />
              )}
            </div>
          </div>
        )}

        {/* Companies (optional) */}
        {companies.length > 0 && (
          <div className="py-14">
            {companiesTitle && <p className="text-center text-sm text-muted-foreground">{companiesTitle}</p>}
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {companies.map((c, idx) => (
                <div className="flex items-center gap-3" key={c.src + idx}>
                  <img src={c.src} alt={c.alt} className="h-5 w-auto md:h-6" />
                </div>
              ))}
            </div>
          </div>
        )}

      
      </div>
    </section>
  );
};
