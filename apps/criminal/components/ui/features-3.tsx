import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/spotlight-card';
import {
  ArrowUp,
  CalendarCheck,
  Globe,
  Plus,
  ShieldCheck,
  Sparkles,
  Signature,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const softCard = 'bg-muted/40 shadow-none p-6';
const innerCard = 'bg-background border-border/60 shadow-sm';

interface Features3Props {
  heading: string;
  className?: string;
}

export default function Features3({ heading, className }: Features3Props) {
  return (
    <section className={cn('py-14 sm:py-24', className)}>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-foreground max-w-2xl text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 — Emergency consultation */}
          <GlowCard customSize glowColor="warm" className={cn('overflow-hidden', softCard)}>
            <CalendarCheck className="size-5 text-[color:var(--gold-warm-deep)]" strokeWidth={2.2} />
            <h3 className="text-foreground mt-5 text-lg font-semibold tracking-tight">
              24시간 긴급 상담
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              구속·체포 등 긴급 상황에 즉시 전담 변호인이 배정되어 상담을 진행합니다.
            </p>
            <MeetingIllustration />
          </GlowCard>

          {/* Feature 2 — Case analysis report */}
          <GlowCard customSize glowColor="warm" className={cn('group overflow-hidden', softCard.replace('p-6', 'px-6 pt-6'))}>
            <ShieldCheck className="size-5 text-[color:var(--gold-warm-deep)]" strokeWidth={2.2} />
            <h3 className="text-foreground mt-5 text-lg font-semibold tracking-tight">
              사건 분석 보고서
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              담당 변호사가 사실관계·증거·쟁점을 분석한 보고서를 통해 변호 전략을 설계합니다.
            </p>
            <CaseAnalysisIllustration />
          </GlowCard>

          {/* Feature 3 — AI assistant */}
          <GlowCard customSize glowColor="warm" className={cn('group overflow-hidden', softCard.replace('p-6', 'px-6 pt-6'))}>
            <Sparkles className="size-5 text-[color:var(--gold-warm-deep)]" strokeWidth={2.2} />
            <h3 className="text-foreground mt-5 text-lg font-semibold tracking-tight">
              AI 사전 상담
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              상황을 입력하면 AI가 1차 분류·관련 판례를 제공해 본 상담 전 사건을 정리해 드립니다.
            </p>
            <div className="-mx-2 -mt-2 px-2 pt-2 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]">
              <AIAssistantIllustration />
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function Avatar({ initial }: { initial: string }) {
  return (
    <div className="bg-background size-7 rounded-full border p-0.5 shadow shadow-zinc-950/5 flex items-center justify-center">
      <span className="text-[10px] font-bold text-[color:var(--gold-warm-deep)]">{initial}</span>
    </div>
  );
}

function MeetingIllustration() {
  return (
    <Card className={cn('mt-8 aspect-video p-4', innerCard)} aria-hidden>
      <div className="mb-0.5 text-sm font-semibold">긴급 상담 예약</div>
      <div className="mb-4 flex gap-2 text-sm">
        <span className="text-muted-foreground">14:30 - 15:30</span>
      </div>
      <div className="mb-2 flex -space-x-1.5">
        {['김', '이', '박', '정'].map((c) => (
          <Avatar key={c} initial={c} />
        ))}
      </div>
      <div className="text-muted-foreground text-sm font-medium">형사 전담 변호인 배정</div>
    </Card>
  );
}

function CaseAnalysisIllustration() {
  return (
    <div className="relative mt-6" aria-hidden>
      <Card className={cn('aspect-video w-4/5 translate-y-4 p-3 transition-transform duration-200 ease-in-out group-hover:-rotate-3', innerCard)}>
        <div className="mb-3 flex items-center gap-2">
          <Avatar initial="김" />
          <span className="text-muted-foreground text-sm font-medium">김 변호사</span>
          <span className="text-muted-foreground/75 text-xs">2분</span>
        </div>
        <div className="ml-8 space-y-2">
          <div className="bg-foreground/10 h-2 rounded-full" />
          <div className="bg-foreground/10 h-2 w-3/5 rounded-full" />
          <div className="bg-foreground/10 h-2 w-1/2 rounded-full" />
        </div>
        <Signature className="ml-8 mt-3 size-5" />
      </Card>
      <Card className={cn('aspect-[3/5] absolute -top-4 right-0 flex w-2/5 translate-y-4 p-2 transition-transform duration-200 ease-in-out group-hover:rotate-3', innerCard)}>
        <div className="bg-foreground/5 m-auto flex size-10 rounded-full">
          <Play className="fill-foreground/50 stroke-foreground/50 m-auto size-4" />
        </div>
      </Card>
    </div>
  );
}

function AIAssistantIllustration() {
  return (
    <Card className={cn('mt-6 aspect-video translate-y-4 p-4 pb-6 transition-transform duration-200 group-hover:translate-y-0', innerCard)} aria-hidden>
      <div className="w-fit">
        <Sparkles className="size-3.5 fill-[color:var(--gold-warm)] stroke-[color:var(--gold-warm)]" />
        <p className="mt-2 line-clamp-2 text-sm">
          긴급한 형사 사건 상담이 가능한가요?
        </p>
      </div>
      <div className="bg-foreground/5 -mx-3 -mb-3 mt-3 space-y-3 rounded-lg p-3">
        <div className="text-muted-foreground text-sm">AI에게 물어보기</div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
              <Plus />
            </Button>
            <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
              <Globe />
            </Button>
          </div>
          <Button size="icon" className="size-7 rounded-2xl bg-[color:var(--gold-warm-deep)] hover:bg-[color:var(--ink-strong)]">
            <ArrowUp strokeWidth={3} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
