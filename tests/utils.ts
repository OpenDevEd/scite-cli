import axios from 'axios';
import snakecaseKeys from 'snakecase-keys';
import { PaperResponse, SearchResultSchema } from '../src/client';

export type Paper = SearchResultSchema | PaperResponse;

export function extractIds(papers: Paper[]) {
  return papers.map((paper) => paper.id).sort();
}

export async function get<T = any>(
  url: string,
  params: Record<string, unknown> = {},
) {
  const res = await axios.get<T>(url, {
    params: snakecaseKeys(params),
    paramsSerializer: {
      indexes: null, // don't use array notation in query string
    },
  });

  return res.data;
}

export async function post<T = any>(url: string, data: any) {
  // convert objects to snake_case before sending to server
  if (typeof data === 'object' && !Array.isArray(data)) {
    data = snakecaseKeys(data);
  }

  const res = await axios.post<T>(url, data);

  return res.data;
}
