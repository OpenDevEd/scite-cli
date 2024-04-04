/* tslint:disable */
/* eslint-disable */
/**
 * Scite API
 * The scite.ai API gives access to citation data, scite tallies, related paper metadata, and scite reference check.  We do not provide API clients but you can generate them using the OpenAPI spec above.  # Terms of Use  Terms of use for the scite API can be [found here](https://scite.ai/apiterms).  # Overview & Terminology  | Target and Source | In our API, we refer to the source as the publication making the  citation and the target as the publication receiving the citation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | |-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| | Tallies           | Tallies are counts of citations for a particular target including how  much a publication has been supported, contradicted, or mentioned. The counts for `total`, `supporting`, `contradicting`, `mentioning` and `unclassified` reflect the number of citation statements made toward the DOI. The count `citingPublications` reflects the number of distinct publications which cite the DOI. This distinction is important because there can be more than one citation statement from a publication. Please note, in our UI and other places we refer to contradicted as contrasted but in our API we refer to it as contradicted. | | Papers            | Papers are the metadata about publications including basic things such  as DOI, title, date of publication and more.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | | Search*           | The search API allows querying scite\'s publication metadata and citation data. Citation sources can be queried both by publication metadata such as year, journal and so on, as well as the content of their citation snippets and where/how they occur.                                                                                                                                                                                                                                                                                                                                                                              | | Reference Check*  | We provide an API for our reference checking capability where a  publication can be submitted and its references can be evaluated and  linked using scite\'s data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | | References*       | In our API \'references\' refers to what are traditionally called \'citations\'. These objects are distinct pairs of source and target DOIs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |  _*Some endpoints/features concerning these resources are restricted please see the [Authentication section](#section/Authentication) for more information._  # Badge  <div class=\"scite-badge\" data-doi=\"10.1016/j.biopsych.2005.08.012\"></div> <div style=\"margin-top: 16px;\"></div> <div class=\"scite-badge\" data-doi=\"10.1016/j.biopsych.2005.08.012\" data-layout=\"horizontal\"></div>  The scite badge provides an easy way to integrate scite.ai on your site without touching the API directly.  For more details please see the [Badge Documentation]({config.frontend_url}/badge)  # Authentication  Most scite endpoints are free to use with ratelimits applied. The default rate limit is up to 10 requests per second, up to 40 requests per minute.  The `/tallies/{{doi}}`, `/tallies/aggregate` and `/papers/{{doi}}` endpoints are uncapped.  Authentication tokens can be passed be used on the Authorization header:  ``` Authorization: Bearer <my-token> ```  For example:  ```bash $ curl -H \'Authorization: Bearer token\' \'https://api.scite.ai/reference_check/tasks/123/cancel\' ```  This can be used to access restricted endpoints or bypass rate limits.  If you would like to obtain an authentication token for heavier or advanced API usage please contact us at [hi@scite.ai](mailto:hi@scite.ai). 
 *
 * The version of the OpenAPI document: latest
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  SearchResultsResponse,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    SearchResultsResponseFromJSON,
    SearchResultsResponseToJSON,
} from '../models/index';

export interface GetSearchSearchGetRequest {
    format?: GetSearchSearchGetFormatEnum;
    term?: string;
    mode?: GetSearchSearchGetModeEnum;
    limit?: number;
    offset?: number;
    sort?: GetSearchSearchGetSortEnum;
    sortOrder?: GetSearchSearchGetSortOrderEnum;
    title?: string;
    _abstract?: string;
    dateFrom?: string;
    dateTo?: string;
    citationTypes?: Array<GetSearchSearchGetCitationTypesEnum>;
    hasRetraction?: boolean;
    hasConcern?: boolean;
    hasCorrection?: boolean;
    hasErratum?: boolean;
    hasWithdrawn?: boolean;
    hasTally?: boolean;
    supportingFrom?: number;
    supportingTo?: number;
    mentioningFrom?: number;
    mentioningTo?: number;
    contrastingFrom?: number;
    contrastingTo?: number;
    citingPublicationsFrom?: number;
    citingPublicationsTo?: number;
    author?: string;
    journal?: string;
    section?: string;
    paperType?: string;
    affiliation?: string;
    topic?: string;
    substances?: Array<string>;
    meshType?: string;
    aggregationsOptions?: string;
    authorization?: string;
}

/**
 * 
 */
export class SearchApi extends runtime.BaseAPI {

    /**
     * scite.ai search API (see [our search page](https://scite.ai/search) for an overview of its capabilities).  ### Basic usage ###  The term param can be used search publications in the scite database.  For example: https://api.scite.ai/search?term=\"CRISPR\"  This will search for documents matching `crispr` in either citation statements or paper metadata.  Many additional filters are documented below.  ### Restrictions ###  Most search features are free to use without an API token, but restrictions are placed on:  | Mode                | Behavior                                                                                          | |---------------------|---------------------------------------------------------------------------------------------------| | Citation statements | Only one citation statement is returned per search for tokens without `premium_plus` permissions. | | Result format       | Only the JSON result format is supported for tokens without at least `premium` permissions.       |  | Mode      | Behavior                                                                        | |-----------|---------------------------------------------------------------------------------| | all       | Match source publications across both smart citations and publication metadata. | | citations | Match source publications only on smart citations.                              | | papers    | Match source publications only on publication metadata.                         |
     * Get search results from a query
     */
    async getSearchSearchGetRaw(requestParameters: GetSearchSearchGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SearchResultsResponse>> {
        const queryParameters: any = {};

        if (requestParameters['format'] != null) {
            queryParameters['format'] = requestParameters['format'];
        }

        if (requestParameters['term'] != null) {
            queryParameters['term'] = requestParameters['term'];
        }

        if (requestParameters['mode'] != null) {
            queryParameters['mode'] = requestParameters['mode'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['sort'] != null) {
            queryParameters['sort'] = requestParameters['sort'];
        }

        if (requestParameters['sortOrder'] != null) {
            queryParameters['sort_order'] = requestParameters['sortOrder'];
        }

        if (requestParameters['title'] != null) {
            queryParameters['title'] = requestParameters['title'];
        }

        if (requestParameters['_abstract'] != null) {
            queryParameters['abstract'] = requestParameters['_abstract'];
        }

        if (requestParameters['dateFrom'] != null) {
            queryParameters['date_from'] = requestParameters['dateFrom'];
        }

        if (requestParameters['dateTo'] != null) {
            queryParameters['date_to'] = requestParameters['dateTo'];
        }

        if (requestParameters['citationTypes'] != null) {
            queryParameters['citation_types'] = requestParameters['citationTypes'];
        }

        if (requestParameters['hasRetraction'] != null) {
            queryParameters['has_retraction'] = requestParameters['hasRetraction'];
        }

        if (requestParameters['hasConcern'] != null) {
            queryParameters['has_concern'] = requestParameters['hasConcern'];
        }

        if (requestParameters['hasCorrection'] != null) {
            queryParameters['has_correction'] = requestParameters['hasCorrection'];
        }

        if (requestParameters['hasErratum'] != null) {
            queryParameters['has_erratum'] = requestParameters['hasErratum'];
        }

        if (requestParameters['hasWithdrawn'] != null) {
            queryParameters['has_withdrawn'] = requestParameters['hasWithdrawn'];
        }

        if (requestParameters['hasTally'] != null) {
            queryParameters['has_tally'] = requestParameters['hasTally'];
        }

        if (requestParameters['supportingFrom'] != null) {
            queryParameters['supporting_from'] = requestParameters['supportingFrom'];
        }

        if (requestParameters['supportingTo'] != null) {
            queryParameters['supporting_to'] = requestParameters['supportingTo'];
        }

        if (requestParameters['mentioningFrom'] != null) {
            queryParameters['mentioning_from'] = requestParameters['mentioningFrom'];
        }

        if (requestParameters['mentioningTo'] != null) {
            queryParameters['mentioning_to'] = requestParameters['mentioningTo'];
        }

        if (requestParameters['contrastingFrom'] != null) {
            queryParameters['contrasting_from'] = requestParameters['contrastingFrom'];
        }

        if (requestParameters['contrastingTo'] != null) {
            queryParameters['contrasting_to'] = requestParameters['contrastingTo'];
        }

        if (requestParameters['citingPublicationsFrom'] != null) {
            queryParameters['citing_publications_from'] = requestParameters['citingPublicationsFrom'];
        }

        if (requestParameters['citingPublicationsTo'] != null) {
            queryParameters['citing_publications_to'] = requestParameters['citingPublicationsTo'];
        }

        if (requestParameters['author'] != null) {
            queryParameters['author'] = requestParameters['author'];
        }

        if (requestParameters['journal'] != null) {
            queryParameters['journal'] = requestParameters['journal'];
        }

        if (requestParameters['section'] != null) {
            queryParameters['section'] = requestParameters['section'];
        }

        if (requestParameters['paperType'] != null) {
            queryParameters['paper_type'] = requestParameters['paperType'];
        }

        if (requestParameters['affiliation'] != null) {
            queryParameters['affiliation'] = requestParameters['affiliation'];
        }

        if (requestParameters['topic'] != null) {
            queryParameters['topic'] = requestParameters['topic'];
        }

        if (requestParameters['substances'] != null) {
            queryParameters['substances'] = requestParameters['substances'];
        }

        if (requestParameters['meshType'] != null) {
            queryParameters['mesh_type'] = requestParameters['meshType'];
        }

        if (requestParameters['aggregationsOptions'] != null) {
            queryParameters['aggregations_options'] = requestParameters['aggregationsOptions'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SearchResultsResponseFromJSON(jsonValue));
    }

    /**
     * scite.ai search API (see [our search page](https://scite.ai/search) for an overview of its capabilities).  ### Basic usage ###  The term param can be used search publications in the scite database.  For example: https://api.scite.ai/search?term=\"CRISPR\"  This will search for documents matching `crispr` in either citation statements or paper metadata.  Many additional filters are documented below.  ### Restrictions ###  Most search features are free to use without an API token, but restrictions are placed on:  | Mode                | Behavior                                                                                          | |---------------------|---------------------------------------------------------------------------------------------------| | Citation statements | Only one citation statement is returned per search for tokens without `premium_plus` permissions. | | Result format       | Only the JSON result format is supported for tokens without at least `premium` permissions.       |  | Mode      | Behavior                                                                        | |-----------|---------------------------------------------------------------------------------| | all       | Match source publications across both smart citations and publication metadata. | | citations | Match source publications only on smart citations.                              | | papers    | Match source publications only on publication metadata.                         |
     * Get search results from a query
     */
    async getSearchSearchGet(requestParameters: GetSearchSearchGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SearchResultsResponse> {
        const response = await this.getSearchSearchGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const GetSearchSearchGetFormatEnum = {
    Json: 'json',
    Csv: 'csv',
    Ris: 'ris'
} as const;
export type GetSearchSearchGetFormatEnum = typeof GetSearchSearchGetFormatEnum[keyof typeof GetSearchSearchGetFormatEnum];
/**
 * @export
 */
export const GetSearchSearchGetModeEnum = {
    All: 'all',
    Citations: 'citations',
    Papers: 'papers',
    QuestionAnswering: 'question-answering'
} as const;
export type GetSearchSearchGetModeEnum = typeof GetSearchSearchGetModeEnum[keyof typeof GetSearchSearchGetModeEnum];
/**
 * @export
 */
export const GetSearchSearchGetSortEnum = {
    Date: 'date',
    TotalCited: 'total_cited',
    TotalSupported: 'total_supported',
    TotalContrasted: 'total_contrasted',
    TotalMentioned: 'total_mentioned',
    TotalCitingPublications: 'total_citing_publications'
} as const;
export type GetSearchSearchGetSortEnum = typeof GetSearchSearchGetSortEnum[keyof typeof GetSearchSearchGetSortEnum];
/**
 * @export
 */
export const GetSearchSearchGetSortOrderEnum = {
    Asc: 'asc',
    Desc: 'desc'
} as const;
export type GetSearchSearchGetSortOrderEnum = typeof GetSearchSearchGetSortOrderEnum[keyof typeof GetSearchSearchGetSortOrderEnum];
/**
 * @export
 */
export const GetSearchSearchGetCitationTypesEnum = {
    Supporting: 'supporting',
    Contrasting: 'contrasting',
    Mentioning: 'mentioning'
} as const;
export type GetSearchSearchGetCitationTypesEnum = typeof GetSearchSearchGetCitationTypesEnum[keyof typeof GetSearchSearchGetCitationTypesEnum];
