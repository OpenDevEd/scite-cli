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
  CitationsCitedByExternalSchema,
  CitationsExternalSchema,
  HTTPValidationError,
} from '../models/index';
import {
    CitationsCitedByExternalSchemaFromJSON,
    CitationsCitedByExternalSchemaToJSON,
    CitationsExternalSchemaFromJSON,
    CitationsExternalSchemaToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
} from '../models/index';

export interface ReadCitationsCitedByExternalApiPartnerCitationsCitedByDoiGetRequest {
    doi: string;
    papers?: boolean;
    tallies?: boolean;
    authorization?: string;
}

export interface ReadCitationsExternalApiPartnerCitationsCitingDoiGetRequest {
    doi: string;
    papers?: boolean;
    tallies?: boolean;
    limit?: number;
    offset?: number;
    authorization?: string;
}

/**
 * 
 */
export class SmartCitationGraphApi extends runtime.BaseAPI {

    /**
     * Get citations made from a given DOI.  Note that the citation statements are excluded from the output.  Can also return relevant paper metadata and tallies for citation sources..  This endpoint requires an API token with special access. For more information, please contact us at sales@scite.ai
     * Receive citations with the DOI as a source paper
     */
    async readCitationsCitedByExternalApiPartnerCitationsCitedByDoiGetRaw(requestParameters: ReadCitationsCitedByExternalApiPartnerCitationsCitedByDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CitationsCitedByExternalSchema>> {
        if (requestParameters['doi'] == null) {
            throw new runtime.RequiredError(
                'doi',
                'Required parameter "doi" was null or undefined when calling readCitationsCitedByExternalApiPartnerCitationsCitedByDoiGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['papers'] != null) {
            queryParameters['papers'] = requestParameters['papers'];
        }

        if (requestParameters['tallies'] != null) {
            queryParameters['tallies'] = requestParameters['tallies'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api_partner/citations/cited_by/{doi}`.replace(`{${"doi"}}`, encodeURIComponent(String(requestParameters['doi']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CitationsCitedByExternalSchemaFromJSON(jsonValue));
    }

    /**
     * Get citations made from a given DOI.  Note that the citation statements are excluded from the output.  Can also return relevant paper metadata and tallies for citation sources..  This endpoint requires an API token with special access. For more information, please contact us at sales@scite.ai
     * Receive citations with the DOI as a source paper
     */
    async readCitationsCitedByExternalApiPartnerCitationsCitedByDoiGet(requestParameters: ReadCitationsCitedByExternalApiPartnerCitationsCitedByDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CitationsCitedByExternalSchema> {
        const response = await this.readCitationsCitedByExternalApiPartnerCitationsCitedByDoiGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get citations made toward a given DOI.  Can also return relevant paper metadata and tallies for citation sources.  Results can be filtered both by a list of source_dois and a list of to limit output.  This endpoint requires an API token with special access. For more information, please contact us at sales@scite.ai
     * Receive citations with the DOI as a target paper
     */
    async readCitationsExternalApiPartnerCitationsCitingDoiGetRaw(requestParameters: ReadCitationsExternalApiPartnerCitationsCitingDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CitationsExternalSchema>> {
        if (requestParameters['doi'] == null) {
            throw new runtime.RequiredError(
                'doi',
                'Required parameter "doi" was null or undefined when calling readCitationsExternalApiPartnerCitationsCitingDoiGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['papers'] != null) {
            queryParameters['papers'] = requestParameters['papers'];
        }

        if (requestParameters['tallies'] != null) {
            queryParameters['tallies'] = requestParameters['tallies'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/api_partner/citations/citing/{doi}`.replace(`{${"doi"}}`, encodeURIComponent(String(requestParameters['doi']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CitationsExternalSchemaFromJSON(jsonValue));
    }

    /**
     * Get citations made toward a given DOI.  Can also return relevant paper metadata and tallies for citation sources.  Results can be filtered both by a list of source_dois and a list of to limit output.  This endpoint requires an API token with special access. For more information, please contact us at sales@scite.ai
     * Receive citations with the DOI as a target paper
     */
    async readCitationsExternalApiPartnerCitationsCitingDoiGet(requestParameters: ReadCitationsExternalApiPartnerCitationsCitingDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CitationsExternalSchema> {
        const response = await this.readCitationsExternalApiPartnerCitationsCitingDoiGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
