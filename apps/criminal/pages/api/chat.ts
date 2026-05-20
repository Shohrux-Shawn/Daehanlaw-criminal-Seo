import type { NextApiRequest, NextApiResponse } from 'next';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

function buildSystemPrompt(practiceArea: string, phoneNumber: string, redirect: boolean): string {
  const base = `당신은 법무법인 대한중앙의 ${practiceArea} AI 법률 상담 어시스턴트입니다.

규칙:
1. 답변은 반드시 한국어로, 2-3문장 이내로 간결하게 작성하세요.
2. 어려운 법률 용어는 쉽게 풀어서 설명하세요.
3. ${practiceArea} 분야의 질문에 집중하되, 관련 분야 질문에는 친절히 답하세요.
4. 구체적인 사건 처리나 소송 전략은 직접 상담을 권유하세요.
5. 상담 연락처: ${phoneNumber} (평일 09:00–18:00)`;

  if (!redirect) return base;

  return `${base}

중요: 사용자가 이미 여러 번 질문했습니다. 답변 마지막에 반드시 다음 문구를 포함하세요:
"더 자세한 상담이 필요하시면 전문 변호사와 직접 상담받으시는 것을 추천드립니다. 📞 전화: ${phoneNumber}"`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken  = process.env.CLOUDFLARE_API_TOKEN;

  const {
    messages,
    messageCount = 0,
    practiceArea = '법률',
    phoneNumber = '1533-7377',
  }: {
    messages: Message[];
    messageCount?: number;
    practiceArea?: string;
    phoneNumber?: string;
  } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  if (!accountId || !apiToken) {
    return res.status(200).json({
      reply: `현재 AI 상담 서비스를 이용할 수 없습니다. 전화로 문의해 주세요: ${phoneNumber}`,
    });
  }

  const systemPrompt = buildSystemPrompt(practiceArea, phoneNumber, messageCount >= 4);

  const cfMessages = [{ role: 'system', content: systemPrompt }, ...messages];

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: cfMessages, max_tokens: 300 }),
      },
    );

    const data = await response.json();

    if (!data.success) {
      return res.status(200).json({ reply: '죄송합니다. 잠시 후 다시 시도해 주세요.' });
    }

    const reply = data?.result?.response ?? '죄송합니다. 잠시 후 다시 시도해 주세요.';
    return res.status(200).json({ reply });
  } catch {
    return res.status(200).json({ reply: '죄송합니다. 잠시 후 다시 시도해 주세요.' });
  }
}
