import { useQuery } from '@tanstack/react-query';

export function useRules(accountAddress: string) {
  const { data, status, error } = useQuery(['rules'], async () => {
    if (!accountAddress.length) return;
    const response = await fetch(`/api/rules?accountAddress=${accountAddress}`, { method: 'GET' });
    const data = (await response.json()) as {
      accountAddress: string;
      rules: Array<{ id: string; rule: any }>;
    };
    return data;
  });

  return { rules: data, status, error };
}
