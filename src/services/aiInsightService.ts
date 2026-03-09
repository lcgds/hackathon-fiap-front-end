import { apiAI } from './api';

export interface InsightResponse {
  insight: string;
}

export const aiService = {
  getInsight: async (): Promise<string> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_AI_INSIGHT_SERVICE}/insights`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            agency: process.env.NEXT_PUBLIC_AGENCY || '0001',
            account: process.env.NEXT_PUBLIC_ACCOUNT || '123456',
          }),
          cache: 'no-store', 
        });

        if (!response.ok) {
          const errorDetail = await response.text();
          console.error(`Error(${response.status}):`, errorDetail);
          return "Council temporarily unavailable.";
        }

        const data = await response.json();
        return data.insightText;
    } catch (error) {
        console.error("Error connecting to the AI ​​service:", error);
        return "We were unable to load the advice right now.";
    }
  },
};