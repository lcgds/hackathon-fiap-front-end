import axios from 'axios';

export const apiAccount = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ACCOUNT_ENTRIES_SERVICE_URL
});

export const apiClassifier = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLASSIFIER_SERVICE_URL
});

export const apiBudget = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BUDGET_SERVICE_URL
});

export const apiAI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_INSIGHT_SERVICE
});