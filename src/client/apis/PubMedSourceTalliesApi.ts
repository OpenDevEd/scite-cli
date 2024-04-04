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
  PubmedSourceTalliesSchema,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    PubmedSourceTalliesSchemaFromJSON,
    PubmedSourceTalliesSchemaToJSON,
} from '../models/index';

export interface GetPubmedSourceTypeTalliesTalliesCitedByPubmedTypesPostRequest {
    requestBody: Array<string>;
    authorization?: string;
}

export interface GetPubmedSourceTypeTallyTalliesDoiCitedByPubmedTypesGetRequest {
    doi: string;
    useView?: boolean;
    authorization?: string;
}

/**
 * 
 */
export class PubMedSourceTalliesApi extends runtime.BaseAPI {

    /**
     * Given a list of up to 500 DOIs, returns tallies for each one telling you how many times each was cited by papers with a particular type from PubMed.
     * Get Pubmed Source Type Tallies
     */
    async getPubmedSourceTypeTalliesTalliesCitedByPubmedTypesPostRaw(requestParameters: GetPubmedSourceTypeTalliesTalliesCitedByPubmedTypesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PubmedSourceTalliesSchema>> {
        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling getPubmedSourceTypeTalliesTalliesCitedByPubmedTypesPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/tallies/cited-by-pubmed-types`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PubmedSourceTalliesSchemaFromJSON(jsonValue));
    }

    /**
     * Given a list of up to 500 DOIs, returns tallies for each one telling you how many times each was cited by papers with a particular type from PubMed.
     * Get Pubmed Source Type Tallies
     */
    async getPubmedSourceTypeTalliesTalliesCitedByPubmedTypesPost(requestParameters: GetPubmedSourceTypeTalliesTalliesCitedByPubmedTypesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PubmedSourceTalliesSchema> {
        const response = await this.getPubmedSourceTypeTalliesTalliesCitedByPubmedTypesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Given a doi, returns tallies telling you how many times it was cited by papers a particular type from PubMed.
     * Get Pubmed Source Type Tally
     */
    async getPubmedSourceTypeTallyTalliesDoiCitedByPubmedTypesGetRaw(requestParameters: GetPubmedSourceTypeTallyTalliesDoiCitedByPubmedTypesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<{ [key: string]: number; }>> {
        if (requestParameters['doi'] == null) {
            throw new runtime.RequiredError(
                'doi',
                'Required parameter "doi" was null or undefined when calling getPubmedSourceTypeTallyTalliesDoiCitedByPubmedTypesGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['useView'] != null) {
            queryParameters['use_view'] = requestParameters['useView'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/tallies/{doi}/cited-by-pubmed-types`.replace(`{${"doi"}}`, encodeURIComponent(String(requestParameters['doi']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Given a doi, returns tallies telling you how many times it was cited by papers a particular type from PubMed.
     * Get Pubmed Source Type Tally
     */
    async getPubmedSourceTypeTallyTalliesDoiCitedByPubmedTypesGet(requestParameters: GetPubmedSourceTypeTallyTalliesDoiCitedByPubmedTypesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<{ [key: string]: number; }> {
        const response = await this.getPubmedSourceTypeTallyTalliesDoiCitedByPubmedTypesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
