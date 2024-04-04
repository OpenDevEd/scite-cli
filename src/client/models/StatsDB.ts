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
/**
 * 
 * @export
 * @interface StatsDB
 */
export interface StatsDB {
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    citationsTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    citationsNewTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    papersTotal?: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    citationsDistinctSources: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    authorsTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    affilationsTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    publishersTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    journalsTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    selfCitesTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    uniqueCitations: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    citationStatementsTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    contrastingTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    mentioningTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    supportingTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    introductionTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    methodsTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    resultsTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    discussionTotal: number;
    /**
     * 
     * @type {number}
     * @memberof StatsDB
     */
    otherTotal: number;
}

/**
 * Check if a given object implements the StatsDB interface.
 */
export function instanceOfStatsDB(value: object): boolean {
    if (!('citationsTotal' in value)) return false;
    if (!('citationsNewTotal' in value)) return false;
    if (!('citationsDistinctSources' in value)) return false;
    if (!('authorsTotal' in value)) return false;
    if (!('affilationsTotal' in value)) return false;
    if (!('publishersTotal' in value)) return false;
    if (!('journalsTotal' in value)) return false;
    if (!('selfCitesTotal' in value)) return false;
    if (!('uniqueCitations' in value)) return false;
    if (!('citationStatementsTotal' in value)) return false;
    if (!('contrastingTotal' in value)) return false;
    if (!('mentioningTotal' in value)) return false;
    if (!('supportingTotal' in value)) return false;
    if (!('introductionTotal' in value)) return false;
    if (!('methodsTotal' in value)) return false;
    if (!('resultsTotal' in value)) return false;
    if (!('discussionTotal' in value)) return false;
    if (!('otherTotal' in value)) return false;
    return true;
}

export function StatsDBFromJSON(json: any): StatsDB {
    return StatsDBFromJSONTyped(json, false);
}

export function StatsDBFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatsDB {
    if (json == null) {
        return json;
    }
    return {
        
        'citationsTotal': json['citationsTotal'],
        'citationsNewTotal': json['citationsNewTotal'],
        'papersTotal': json['papersTotal'] == null ? undefined : json['papersTotal'],
        'citationsDistinctSources': json['citationsDistinctSources'],
        'authorsTotal': json['authorsTotal'],
        'affilationsTotal': json['affilationsTotal'],
        'publishersTotal': json['publishersTotal'],
        'journalsTotal': json['journalsTotal'],
        'selfCitesTotal': json['selfCitesTotal'],
        'uniqueCitations': json['uniqueCitations'],
        'citationStatementsTotal': json['citationStatementsTotal'],
        'contrastingTotal': json['contrastingTotal'],
        'mentioningTotal': json['mentioningTotal'],
        'supportingTotal': json['supportingTotal'],
        'introductionTotal': json['introductionTotal'],
        'methodsTotal': json['methodsTotal'],
        'resultsTotal': json['resultsTotal'],
        'discussionTotal': json['discussionTotal'],
        'otherTotal': json['otherTotal'],
    };
}

export function StatsDBToJSON(value?: StatsDB | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'citationsTotal': value['citationsTotal'],
        'citationsNewTotal': value['citationsNewTotal'],
        'papersTotal': value['papersTotal'],
        'citationsDistinctSources': value['citationsDistinctSources'],
        'authorsTotal': value['authorsTotal'],
        'affilationsTotal': value['affilationsTotal'],
        'publishersTotal': value['publishersTotal'],
        'journalsTotal': value['journalsTotal'],
        'selfCitesTotal': value['selfCitesTotal'],
        'uniqueCitations': value['uniqueCitations'],
        'citationStatementsTotal': value['citationStatementsTotal'],
        'contrastingTotal': value['contrastingTotal'],
        'mentioningTotal': value['mentioningTotal'],
        'supportingTotal': value['supportingTotal'],
        'introductionTotal': value['introductionTotal'],
        'methodsTotal': value['methodsTotal'],
        'resultsTotal': value['resultsTotal'],
        'discussionTotal': value['discussionTotal'],
        'otherTotal': value['otherTotal'],
    };
}

