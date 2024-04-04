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
  DashboardTotalArticleCountRS,
  HTTPValidationError,
  IssnEditorialNoticeResponse,
  IssnSjiResponse,
  JournalTallyRS,
  JournalYearlySciteIndexRS,
} from '../models/index';
import {
    DashboardTotalArticleCountRSFromJSON,
    DashboardTotalArticleCountRSToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    IssnEditorialNoticeResponseFromJSON,
    IssnEditorialNoticeResponseToJSON,
    IssnSjiResponseFromJSON,
    IssnSjiResponseToJSON,
    JournalTallyRSFromJSON,
    JournalTallyRSToJSON,
    JournalYearlySciteIndexRSFromJSON,
    JournalYearlySciteIndexRSToJSON,
} from '../models/index';

export interface GetIssnEditorialNoticesIssnEditorialNoticesGetRequest {
    issn: string;
    authorization?: string;
}

export interface GetIssnSjiIssnSjiGetRequest {
    issn: string;
    year?: string;
    authorization?: string;
}

export interface GetIssnsSjiIssnSjiBulkPostRequest {
    requestBody: Array<string>;
    authorization?: string;
}

export interface GetJournalDashboardArticleCountDashboardsJournalSlugOrIssnArticleCountGetRequest {
    slugOrIssn: string;
    authorization?: string;
}

export interface GetJournalTalliesJournalIssnTalliesGetRequest {
    issn: string;
    authorization?: string;
}

export interface GetJournalYearlySciteIndexJournalIssnYearlySiGetRequest {
    issn: string;
    years?: Array<number>;
    authorization?: string;
}

/**
 * 
 */
export class JournalApi extends runtime.BaseAPI {

    /**
     * Get multiple editorial notice aggregations for multiple ISSNs.  Up to 500 ISSNs can be specified at once.
     * Get Issn Editorial Notices
     */
    async getIssnEditorialNoticesIssnEditorialNoticesGetRaw(requestParameters: GetIssnEditorialNoticesIssnEditorialNoticesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<IssnEditorialNoticeResponse>>> {
        if (requestParameters['issn'] == null) {
            throw new runtime.RequiredError(
                'issn',
                'Required parameter "issn" was null or undefined when calling getIssnEditorialNoticesIssnEditorialNoticesGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['issn'] != null) {
            queryParameters['issn'] = requestParameters['issn'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/issn-editorial-notices`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(IssnEditorialNoticeResponseFromJSON));
    }

    /**
     * Get multiple editorial notice aggregations for multiple ISSNs.  Up to 500 ISSNs can be specified at once.
     * Get Issn Editorial Notices
     */
    async getIssnEditorialNoticesIssnEditorialNoticesGet(requestParameters: GetIssnEditorialNoticesIssnEditorialNoticesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<IssnEditorialNoticeResponse>> {
        const response = await this.getIssnEditorialNoticesIssnEditorialNoticesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Read the scite Journal Index for a single ISSN.  For example: https://api.scite.ai/issn-sji?issn=2232-9935.
     * Get scite journal index for ISSN
     */
    async getIssnSjiIssnSjiGetRaw(requestParameters: GetIssnSjiIssnSjiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<IssnSjiResponse>>> {
        if (requestParameters['issn'] == null) {
            throw new runtime.RequiredError(
                'issn',
                'Required parameter "issn" was null or undefined when calling getIssnSjiIssnSjiGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['issn'] != null) {
            queryParameters['issn'] = requestParameters['issn'];
        }

        if (requestParameters['year'] != null) {
            queryParameters['year'] = requestParameters['year'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/issn-sji`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(IssnSjiResponseFromJSON));
    }

    /**
     * Read the scite Journal Index for a single ISSN.  For example: https://api.scite.ai/issn-sji?issn=2232-9935.
     * Get scite journal index for ISSN
     */
    async getIssnSjiIssnSjiGet(requestParameters: GetIssnSjiIssnSjiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<IssnSjiResponse>> {
        const response = await this.getIssnSjiIssnSjiGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get multiple scite journal indices for multiple ISSNs.  Up to 500 ISSNs can be specified at once.
     * Get scite journal index for multiple ISSNs
     */
    async getIssnsSjiIssnSjiBulkPostRaw(requestParameters: GetIssnsSjiIssnSjiBulkPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: Array<IssnSjiResponse>; }>> {
        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling getIssnsSjiIssnSjiBulkPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/issn-sji-bulk`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get multiple scite journal indices for multiple ISSNs.  Up to 500 ISSNs can be specified at once.
     * Get scite journal index for multiple ISSNs
     */
    async getIssnsSjiIssnSjiBulkPost(requestParameters: GetIssnsSjiIssnSjiBulkPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: Array<IssnSjiResponse>; }> {
        const response = await this.getIssnsSjiIssnSjiBulkPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get count of publications for scite journal dashboard by valid ISSN.
     * Get count of publications for a journal dashboard by slug/ISSN
     */
    async getJournalDashboardArticleCountDashboardsJournalSlugOrIssnArticleCountGetRaw(requestParameters: GetJournalDashboardArticleCountDashboardsJournalSlugOrIssnArticleCountGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DashboardTotalArticleCountRS>> {
        if (requestParameters['slugOrIssn'] == null) {
            throw new runtime.RequiredError(
                'slugOrIssn',
                'Required parameter "slugOrIssn" was null or undefined when calling getJournalDashboardArticleCountDashboardsJournalSlugOrIssnArticleCountGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/dashboards/journal/{slug_or_issn}/article-count`.replace(`{${"slug_or_issn"}}`, encodeURIComponent(String(requestParameters['slugOrIssn']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DashboardTotalArticleCountRSFromJSON(jsonValue));
    }

    /**
     * Get count of publications for scite journal dashboard by valid ISSN.
     * Get count of publications for a journal dashboard by slug/ISSN
     */
    async getJournalDashboardArticleCountDashboardsJournalSlugOrIssnArticleCountGet(requestParameters: GetJournalDashboardArticleCountDashboardsJournalSlugOrIssnArticleCountGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DashboardTotalArticleCountRS> {
        const response = await this.getJournalDashboardArticleCountDashboardsJournalSlugOrIssnArticleCountGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get tally information for a journal given a valid ISSN.  Response includes a tally of the number of supporting, mentioning,     and contrasting citation statements received by publications     from this journal.
     * Get Smart Citation tallies for a journal
     */
    async getJournalTalliesJournalIssnTalliesGetRaw(requestParameters: GetJournalTalliesJournalIssnTalliesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<JournalTallyRS>> {
        if (requestParameters['issn'] == null) {
            throw new runtime.RequiredError(
                'issn',
                'Required parameter "issn" was null or undefined when calling getJournalTalliesJournalIssnTalliesGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/journal/{issn}/tallies`.replace(`{${"issn"}}`, encodeURIComponent(String(requestParameters['issn']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JournalTallyRSFromJSON(jsonValue));
    }

    /**
     * Get tally information for a journal given a valid ISSN.  Response includes a tally of the number of supporting, mentioning,     and contrasting citation statements received by publications     from this journal.
     * Get Smart Citation tallies for a journal
     */
    async getJournalTalliesJournalIssnTalliesGet(requestParameters: GetJournalTalliesJournalIssnTalliesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<JournalTallyRS> {
        const response = await this.getJournalTalliesJournalIssnTalliesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get scite index information for a journal given its slug     or a valid ISSN, and an optional list of years.  If no year is specified, returns the various scite index values     for all years.  To specify one year in the request, use the following format:  `/journal/{issn}/yearly-si&years={YEAR_ONE}`  To specify multiple years in the request, use the following format:  `/journal/{issn}/yearly-si&years={YEAR_ONE}&years={YEAR_TWO}`  Response includes a list of objects, each one containing the `twoYearSi`, `fiveYearSi`, `allYearSi` relative to the corresponding year.
     * Get yearly scite index for a journal
     */
    async getJournalYearlySciteIndexJournalIssnYearlySiGetRaw(requestParameters: GetJournalYearlySciteIndexJournalIssnYearlySiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<JournalYearlySciteIndexRS>>> {
        if (requestParameters['issn'] == null) {
            throw new runtime.RequiredError(
                'issn',
                'Required parameter "issn" was null or undefined when calling getJournalYearlySciteIndexJournalIssnYearlySiGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['years'] != null) {
            queryParameters['years'] = requestParameters['years'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/journal/{issn}/yearly-si`.replace(`{${"issn"}}`, encodeURIComponent(String(requestParameters['issn']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(JournalYearlySciteIndexRSFromJSON));
    }

    /**
     * Get scite index information for a journal given its slug     or a valid ISSN, and an optional list of years.  If no year is specified, returns the various scite index values     for all years.  To specify one year in the request, use the following format:  `/journal/{issn}/yearly-si&years={YEAR_ONE}`  To specify multiple years in the request, use the following format:  `/journal/{issn}/yearly-si&years={YEAR_ONE}&years={YEAR_TWO}`  Response includes a list of objects, each one containing the `twoYearSi`, `fiveYearSi`, `allYearSi` relative to the corresponding year.
     * Get yearly scite index for a journal
     */
    async getJournalYearlySciteIndexJournalIssnYearlySiGet(requestParameters: GetJournalYearlySciteIndexJournalIssnYearlySiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<JournalYearlySciteIndexRS>> {
        const response = await this.getJournalYearlySciteIndexJournalIssnYearlySiGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
