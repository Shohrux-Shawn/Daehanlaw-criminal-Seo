import type { Agent } from '@daehanlaw/graphql';

interface AttorneyCardProps {
  agent: Agent;
  apiBaseUrl?: string;
}


function resolveImage(path: string | undefined, apiBaseUrl: string): string {
  if (!path) return '/attorney-placeholder.png';
  if (path.startsWith('http')) return path;
  return `${apiBaseUrl}/${path}`;
}

export function AttorneyCard({ agent, apiBaseUrl = 'https://api.daehanlaw.com' }: AttorneyCardProps) {
  const photo = agent.agentImage?.[0];

  return (
    <article className="group relative bg-white rounded-xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gold-400 transition-all duration-200">
      {/* Photo */}
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={resolveImage(photo, apiBaseUrl)}
          alt={agent.agentFullName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(13,22,41,0.75) 0%, rgba(13,22,41,0.2) 45%, transparent 65%)',
          }}
          aria-hidden
        />
      </div>

      {/* Name overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[10px] font-semibold text-gold-400 uppercase tracking-wider mb-0.5">
          {agent.agentType}
        </p>
        <p className="text-[15px] font-bold text-white">{agent.agentFullName}</p>
      </div>
    </article>
  );
}
