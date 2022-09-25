import { useQuery } from '@tanstack/react-query';

export function useSaveRules({
  accountAddress,
  rules,
}: {
  accountAddress: string;
  rules: Array<any>;
}) {
  const { data, status, error } = useQuery(['saved-rules'], async () => {
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
