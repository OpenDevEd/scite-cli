import ora from 'ora';
import querystring from 'querystring';
import { addProp, isNullish, omit, omitBy, pipe } from 'remeda';
import { Argv } from 'yargs';
import { z } from 'zod';
import * as scite from '../client';
import {
  GetSearchSearchGetCitationTypesEnum as CitationTypesEnum,
  GetSearchSearchGetModeEnum as ModeEnum,
  GetSearchSearchGetSortEnum as SortEnum,
  GetSearchSearchGetSortOrderEnum as SortOrderEnum,
} from '../client';
import { InferArguments } from '../types';
import { ZodDateString, expand, output, readConfig } from '../utils';

export const command = 'search [terms...]';

export const description = `Search the scite database for documents matching terms.`;

export const schema = z
  .object({
    terms: z.array(z.string().min(1)),
    output: z.string().min(1),
    count: z.boolean(),
    mode: z.nativeEnum(ModeEnum),
    limit: z.number().int().positive().max(10000),
    offset: z.number().int().nonnegative(),
    sort: z.nativeEnum(SortEnum),
    'sort-order': z.nativeEnum(SortOrderEnum),
    title: z.boolean(),
    abstract: z.boolean(),
    'date-from': ZodDateString(['YYYY-MM-DD', 'YYYY']),
    'date-to': ZodDateString(['YYYY-MM-DD', 'YYYY']),
    'citation-types': z.nativeEnum(CitationTypesEnum),
    'has-retraction': z.boolean(),
    'has-concern': z.boolean(),
    'has-correction': z.boolean(),
    'has-erratum': z.boolean(),
    'has-withdrawn': z.boolean(),
    'has-tally': z.boolean(),
    'supporting-from': z.number().int().nonnegative(),
    'supporting-to': z.number().int().nonnegative(),
    'mentioning-from': z.number().int().nonnegative(),
    'mentioning-to': z.number().int().nonnegative(),
    'contrasting-from': z.number().int().nonnegative(),
    'contrasting-to': z.number().int().nonnegative(),
    'citing-publications-from': z.number().int().nonnegative(),
    'citing-publications-to': z.number().int().nonnegative(),
    author: z.string().min(1),
    journal: z.string().min(1),
    section: z.string().min(1),
    'paper-type': z.string().min(1),
    affiliation: z.string().min(1),
    topic: z.string().min(1),
    substances: z.array(z.string().min(1)),
    'mesh-type': z.string().min(1),
    'aggregations-options': z.string().min(1),
  })
  .partial();

export function builder(yargs: Argv) {
  return yargs
    .positional('terms', { type: 'string' })
    .array('terms')
    .describe('terms', 'Cross-field search terms. Can be left blank.')
    .string('output')
    .alias('output', 'o')
    .describe('output', 'File path to save output to')
    .default('output', 'output.json')
    .boolean('count')
    .alias('count', 'c')
    .describe('count', 'Return the number of results that match the query.')
    .choices('mode', Object.values(ModeEnum))
    .describe(
      'mode',
      `- all : Match across smart citations and publication metadata.
- citations : Match only on smart citations.
- papers : Match only on publication metadata.
- question-answering : (Description not available).`,
    )
    .number('limit')
    .default('limit', 100)
    .describe(
      'limit',
      'How many results to fetch. Up to 10,000 can be fetched at once.',
    )
    .number('offset')
    .default('offset', 0)
    .describe('offset', 'Can be used for pagination in combination with limit.')
    .choices('sort', Object.values(SortEnum))
    .describe(
      'sort',
      'How the results should be sorted. By default, results are sorted by "relevance".\n',
    )
    .choices('sort-order', Object.values(SortOrderEnum))
    .describe('sort-order', 'Result sort order for selected sort.')
    .default('sort-order', SortOrderEnum.Desc)
    .boolean('title')
    .describe('title', 'Match text in publication title.')
    .boolean('abstract')
    .describe('abstract', 'Match text in publication abstract.')
    .string('date-from')
    .describe(
      'date-from',
      'Match publications published from this date onwards (YYYY-MM-DD or YYYY).',
    )
    .string('date-to')
    .describe(
      'date-to',
      'Match publications published up to this date (YYYY-MM-DD or YYYY).',
    )
    .choices('citation-types', Object.values(CitationTypesEnum))
    .array('citation-types')
    .describe('citation-types', 'Match smart citations of certain types.')
    .boolean('has-retraction')
    .describe('has-retraction', 'Publication has retraction or not.')
    .boolean('has-concern')
    .describe('has-concern', 'Publication has editorial concern or not.')
    .boolean('has-correction')
    .describe('has-correction', 'Publication has correction or not.')
    .boolean('has-erratum')
    .describe('has-erratum', 'Publication has erratum or not.')
    .boolean('has-withdrawn')
    .describe('has-withdrawn', 'Publication has been withdrawn or not.')
    .boolean('has-tally')
    .describe(
      'has-tally',
      'Publication has smart citations made towards it or not (i.e. a scite tally of > 0).',
    )
    .number('supporting-from')
    .describe(
      'supporting-from',
      'Number of supporting citations made from publication.',
    )
    .number('supporting-to')
    .describe(
      'supporting-to',
      'Number of supporting citations made toward publication.',
    )
    .number('mentioning-from')
    .describe(
      'mentioning-from',
      'Number of mentioning citations made from publication.',
    )
    .number('mentioning-to')
    .describe(
      'mentioning-to',
      'Number of mentioning citations made toward publication.',
    )
    .number('contrasting-from')
    .describe(
      'contrasting-from',
      'Number of contrasting citations made from publication.',
    )
    .number('contrasting-to')
    .describe(
      'contrasting-to',
      'Number of contrasting citations made toward publication.',
    )
    .number('citing-publications-from')

    .describe(
      'citing-publications-from',
      'Number of traditional citations made from publication AKA the number of references.',
    )
    .number('citing-publications-to')
    .describe(
      'citing-publications-to',
      'Number of traditional citations made toward publication.',
    )
    .string('author')
    .describe('author', 'Publication author name.')
    .string('journal')
    .describe('journal', 'Journal in which publication appears.')
    .string('section')
    .describe(
      'section',
      'Publication section in which citation statement appears.',
    )
    .string('paper-type')
    .describe('paper-type', 'Publication type.')
    .string('affiliation')
    .describe('affiliation', 'Author affiliation.')
    .string('topic')
    .describe('topic', 'Publication topic.')
    .string('substances')
    .array('substances')
    .describe('substances', 'Pubchem substance cannonical name.')
    .string('mesh-type')
    .describe(
      'mesh-type',
      'Pubmed mesh descriptor and/or qualifier for publication.',
    )
    .string('aggregations-options')
    .describe('aggregations-options', 'Aggregations Options')
    .check((argv) => schema.parse(argv));
}

async function main(argv: InferArguments<typeof builder>, spinner: ora.Ora) {
  spinner.text = 'reading config';

  const config = await readConfig();
  const api = new scite.SearchApi(config);
  const term = argv.terms?.join(' ') || '';

  spinner.text = 'expanding search terms';

  const query = await expand(term);
  const params = {
    term: argv.title || argv.abstract ? undefined : query,
    mode: argv.mode,
    limit: argv.count ? 1 : argv.limit,
    offset: argv.offset,
    sort: argv.sort,
    sortOrder: argv.sortOrder,
    title: argv.title ? query : undefined,
    _abstract: argv.abstract ? query : undefined,
    dateFrom: argv.dateFrom,
    dateTo: argv.dateTo,
    citationTypes: argv.citationTypes,
    hasRetraction: argv.hasRetraction,
    hasConcern: argv.hasConcern,
    hasCorrection: argv.hasCorrection,
    hasErratum: argv.hasErratum,
    hasWithdrawn: argv.hasWithdrawn,
    hasTally: argv.hasTally,
    supportingFrom: argv.supportingFrom,
    supportingTo: argv.supportingTo,
    mentioningFrom: argv.mentioningFrom,
    mentioningTo: argv.mentioningTo,
    contrastingFrom: argv.contrastingFrom,
    contrastingTo: argv.contrastingTo,
    citingPublicationsFrom: argv.citingPublicationsFrom,
    citingPublicationsTo: argv.citingPublicationsTo,
    author: argv.author,
    journal: argv.journal,
    section: argv.section,
    paperType: argv.paperType,
    affiliation: argv.affiliation,
    topic: argv.topic,
    substances: argv.substances,
    meshType: argv.meshType,
    aggregationsOptions: argv.aggregationsOptions,
  } satisfies scite.GetSearchSearchGetRequest;

  const url = new URL('/search', config.basePath);

  url.search = pipe(
    params,
    omit(['_abstract']),
    addProp('abstract', params._abstract),
    omitBy(isNullish),
    querystring.stringify,
  );

  spinner.stop();
  console.log(`URL length: ${url.href.length}/8192`);
  spinner.start();

  spinner.text = 'fetching data';
  const data = await api.getSearchSearchGet(params);

  spinner.stop();
  if (argv.count) return console.log(data.count);
  spinner.start();

  const content = {
    meta: {
      version: 'OpenDevEd_jsonUploaderV01',
      query: query,
      searchTerm: term,
      totalResults: data.count,
      source: 'Scite',
      sourceFormat: 'original',
      date: new Date().toISOString(),
      searchField: argv.title
        ? argv.abstract
          ? 'title_abstract'
          : 'title'
        : 'fulltext',
      page: Math.floor(params.offset / params.limit) + 1,
      resultsPerPage: params.limit,
      firstItem: params.offset + 1,
      startingPage: 1,
      endingPage: Math.ceil(data.count / params.limit),
      filters: omit(params, [
        'limit',
        'offset',
        'sort',
        'sortOrder',
        '_abstract',
        'term',
        'title',
      ]),
      groupBy: '',
      sortBy: {
        field: params.sort || 'relevance',
        order: params.sortOrder,
      },
    },
    results: data.hits.map((paper) =>
      pipe(paper, omit(['_abstract']), addProp('abstract', paper._abstract)),
    ),
  };

  await output(content, argv.output);

  spinner.succeed(`saved to ${JSON.stringify(argv.output)}`);
}

export async function handler(argv: InferArguments<typeof builder>) {
  const spinner = ora().start();

  try {
    await main(argv, spinner);
  } catch (error) {
    spinner.fail('error');
    throw error;
  }
}
