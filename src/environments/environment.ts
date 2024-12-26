export const environment = {
  apiUrl: (window as any).env?.API_URL || 'http://no-domaine-provide',
  appInsightKey: (window as any).env?.APP_INSIGHT_KEY || 'no-key-provide',
};
