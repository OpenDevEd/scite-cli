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
  AggregateTallyResponse,
  HTTPValidationError,
  SectionTalliesSchema,
  SectionTallyResponse,
  SmartCitationTalliesSchema,
  TallyResponse,
} from '../models/index';
import {
    AggregateTallyResponseFromJSON,
    AggregateTallyResponseToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    SectionTalliesSchemaFromJSON,
    SectionTalliesSchemaToJSON,
    SectionTallyResponseFromJSON,
    SectionTallyResponseToJSON,
    SmartCitationTalliesSchemaFromJSON,
    SmartCitationTalliesSchemaToJSON,
    TallyResponseFromJSON,
    TallyResponseToJSON,
} from '../models/index';

export interface GetAggregateTallyTalliesAggregatePostRequest {
    requestBody: Array<string>;
    authorization?: string;
}

export interface GetSectionTalliesTalliesCitedBySectionsPostRequest {
    requestBody: Array<string>;
    authorization?: string;
}

export interface GetSectionTallyTalliesCitedBySectionsDoiGetRequest {
    doi: string;
    useView?: boolean;
    authorization?: string;
}

export interface GetTalliesTalliesGetRequest {
    requestBody: Array<string>;
    authorization?: string;
}

export interface GetTalliesTalliesPostRequest {
    requestBody: Array<string>;
    authorization?: string;
}

export interface GetTallyTalliesDoiGetRequest {
    doi: string;
    useView?: boolean;
    authorization?: string;
}

/**
 * 
 */
export class TalliesApi extends runtime.BaseAPI {

    /**
     * Get the sum of multiple tallies by DOI.  Up to 100 DOIs can be requested.
     * Get Aggregate Tally
     */
    async getAggregateTallyTalliesAggregatePostRaw(requestParameters: GetAggregateTallyTalliesAggregatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AggregateTallyResponse>> {
        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling getAggregateTallyTalliesAggregatePost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/tallies/aggregate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AggregateTallyResponseFromJSON(jsonValue));
    }

    /**
     * Get the sum of multiple tallies by DOI.  Up to 100 DOIs can be requested.
     * Get Aggregate Tally
     */
    async getAggregateTallyTalliesAggregatePost(requestParameters: GetAggregateTallyTalliesAggregatePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AggregateTallyResponse> {
        const response = await this.getAggregateTallyTalliesAggregatePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get multiple section tallies.  Pass in a list of DOIs and receive a tally for each one     indicating how many times it was cited within     various sections -- Intro, Methods, Results, Discussion,     or Other.  Up to 500 tallies can be requested at once.
     * Get Section Tallies
     */
    async getSectionTalliesTalliesCitedBySectionsPostRaw(requestParameters: GetSectionTalliesTalliesCitedBySectionsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SectionTalliesSchema>> {
        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling getSectionTalliesTalliesCitedBySectionsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/tallies/cited-by-sections`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SectionTalliesSchemaFromJSON(jsonValue));
    }

    /**
     * Get multiple section tallies.  Pass in a list of DOIs and receive a tally for each one     indicating how many times it was cited within     various sections -- Intro, Methods, Results, Discussion,     or Other.  Up to 500 tallies can be requested at once.
     * Get Section Tallies
     */
    async getSectionTalliesTalliesCitedBySectionsPost(requestParameters: GetSectionTalliesTalliesCitedBySectionsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionTalliesSchema> {
        const response = await this.getSectionTalliesTalliesCitedBySectionsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get section tally for given DOI
     * Get Section Tally
     */
    async getSectionTallyTalliesCitedBySectionsDoiGetRaw(requestParameters: GetSectionTallyTalliesCitedBySectionsDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SectionTallyResponse>> {
        if (requestParameters['doi'] == null) {
            throw new runtime.RequiredError(
                'doi',
                'Required parameter "doi" was null or undefined when calling getSectionTallyTalliesCitedBySectionsDoiGet().'
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
            path: `/tallies/cited-by-sections/{doi}`.replace(`{${"doi"}}`, encodeURIComponent(String(requestParameters['doi']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SectionTallyResponseFromJSON(jsonValue));
    }

    /**
     * Get section tally for given DOI
     * Get Section Tally
     */
    async getSectionTallyTalliesCitedBySectionsDoiGet(requestParameters: GetSectionTallyTalliesCitedBySectionsDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SectionTallyResponse> {
        const response = await this.getSectionTallyTalliesCitedBySectionsDoiGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get multiple smart citation tallies.  Pass in a list of DOIs and receive a tally for each one.  Up to 500 tallies can be requested at once.
     * Get Tallies
     */
    async getTalliesTalliesGetRaw(requestParameters: GetTalliesTalliesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SmartCitationTalliesSchema>> {
        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling getTalliesTalliesGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/tallies`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SmartCitationTalliesSchemaFromJSON(jsonValue));
    }

    /**
     * Get multiple smart citation tallies.  Pass in a list of DOIs and receive a tally for each one.  Up to 500 tallies can be requested at once.
     * Get Tallies
     */
    async getTalliesTalliesGet(requestParameters: GetTalliesTalliesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SmartCitationTalliesSchema> {
        const response = await this.getTalliesTalliesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get multiple smart citation tallies.  Pass in a list of DOIs and receive a tally for each one.  Up to 500 tallies can be requested at once.
     * Get Tallies
     */
    async getTalliesTalliesPostRaw(requestParameters: GetTalliesTalliesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SmartCitationTalliesSchema>> {
        if (requestParameters['requestBody'] == null) {
            throw new runtime.RequiredError(
                'requestBody',
                'Required parameter "requestBody" was null or undefined when calling getTalliesTalliesPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/tallies`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['requestBody'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SmartCitationTalliesSchemaFromJSON(jsonValue));
    }

    /**
     * Get multiple smart citation tallies.  Pass in a list of DOIs and receive a tally for each one.  Up to 500 tallies can be requested at once.
     * Get Tallies
     */
    async getTalliesTalliesPost(requestParameters: GetTalliesTalliesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SmartCitationTalliesSchema> {
        const response = await this.getTalliesTalliesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get smart citation tally for given DOI
     * Get Tally
     */
    async getTallyTalliesDoiGetRaw(requestParameters: GetTallyTalliesDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TallyResponse>> {
        if (requestParameters['doi'] == null) {
            throw new runtime.RequiredError(
                'doi',
                'Required parameter "doi" was null or undefined when calling getTallyTalliesDoiGet().'
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
            path: `/tallies/{doi}`.replace(`{${"doi"}}`, encodeURIComponent(String(requestParameters['doi']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TallyResponseFromJSON(jsonValue));
    }

    /**
     * Get smart citation tally for given DOI
     * Get Tally
     */
    async getTallyTalliesDoiGet(requestParameters: GetTallyTalliesDoiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TallyResponse> {
        const response = await this.getTallyTalliesDoiGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
