import { PaperResponse, SearchResultSchema } from '../src/client';

export type Paper = SearchResultSchema | PaperResponse;

export function extractIds(papers: Paper[]) {
  return papers.map((paper) => paper.id).sort();
}
