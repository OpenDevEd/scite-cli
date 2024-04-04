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

import { mapValues } from '../runtime';
import type { AuthorSchema } from './AuthorSchema';
import {
    AuthorSchemaFromJSON,
    AuthorSchemaFromJSONTyped,
    AuthorSchemaToJSON,
} from './AuthorSchema';

/**
 * 
 * @export
 * @interface SourceMetadata
 */
export interface SourceMetadata {
    /**
     * 
     * @type {string}
     * @memberof SourceMetadata
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof SourceMetadata
     */
    _abstract?: string;
    /**
     * 
     * @type {Array<AuthorSchema>}
     * @memberof SourceMetadata
     */
    authors?: Array<AuthorSchema>;
    /**
     * 
     * @type {string}
     * @memberof SourceMetadata
     */
    journal?: string;
    /**
     * 
     * @type {string}
     * @memberof SourceMetadata
     */
    volume?: string;
    /**
     * 
     * @type {string}
     * @memberof SourceMetadata
     */
    date?: string;
    /**
     * 
     * @type {string}
     * @memberof SourceMetadata
     */
    page?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof SourceMetadata
     */
    keywords?: Array<string>;
}

/**
 * Check if a given object implements the SourceMetadata interface.
 */
export function instanceOfSourceMetadata(value: object): boolean {
    return true;
}

export function SourceMetadataFromJSON(json: any): SourceMetadata {
    return SourceMetadataFromJSONTyped(json, false);
}

export function SourceMetadataFromJSONTyped(json: any, ignoreDiscriminator: boolean): SourceMetadata {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'] == null ? undefined : json['title'],
        '_abstract': json['abstract'] == null ? undefined : json['abstract'],
        'authors': json['authors'] == null ? undefined : ((json['authors'] as Array<any>).map(AuthorSchemaFromJSON)),
        'journal': json['journal'] == null ? undefined : json['journal'],
        'volume': json['volume'] == null ? undefined : json['volume'],
        'date': json['date'] == null ? undefined : json['date'],
        'page': json['page'] == null ? undefined : json['page'],
        'keywords': json['keywords'] == null ? undefined : json['keywords'],
    };
}

export function SourceMetadataToJSON(value?: SourceMetadata | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'abstract': value['_abstract'],
        'authors': value['authors'] == null ? undefined : ((value['authors'] as Array<any>).map(AuthorSchemaToJSON)),
        'journal': value['journal'],
        'volume': value['volume'],
        'date': value['date'],
        'page': value['page'],
        'keywords': value['keywords'],
    };
}

