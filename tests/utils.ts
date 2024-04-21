import axios from 'axios';
import snakecaseKeys from 'snakecase-keys';
import { PaperResponse, SearchResultSchema } from '../src/client';

/**
 * Alias type for search results
 */
export type Paper = SearchResultSchema | PaperResponse;

/**
 * Extract paper IDs from array of papers
 * @param {Paper[]} papers - Array of paper objects
 * @returns {string[]} Sorted array of paper IDs
 */
export function extractIds(papers: Paper[]) {
  return papers.map((paper) => paper.id).sort();
}

/**
 * Make a GET request
 * @param {string} url - Request URL
 * @param {Object<string, unknown>} [params] - Request parameters
 * @returns {Promise<T>} Promise resolving to response data
 */
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

/**
 * Make a POST request
 * @param {string} url - Request URL
 * @param {any} data - Request body
 * @returns {Promise<T>} Promise resolving to response data
 */
export async function post<T = any>(url: string, data: any) {
  // convert objects to snake_case before sending to server
  if (typeof data === 'object' && !Array.isArray(data)) {
    data = snakecaseKeys(data);
  }

  const res = await axios.post<T>(url, data);

  return res.data;
}
