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
import type { SelfCiteSchema } from './SelfCiteSchema';
import {
    SelfCiteSchemaFromJSON,
    SelfCiteSchemaFromJSONTyped,
    SelfCiteSchemaToJSON,
} from './SelfCiteSchema';

/**
 * 
 * @export
 * @interface ReferenceSchema
 */
export interface ReferenceSchema {
    /**
     * 
     * @type {string}
     * @memberof ReferenceSchema
     */
    source: string;
    /**
     * 
     * @type {string}
     * @memberof ReferenceSchema
     */
    target: string;
    /**
     * 
     * @type {Date}
     * @memberof ReferenceSchema
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ReferenceSchema
     */
    lastUpdated?: Date;
    /**
     * 
     * @type {Array<SelfCiteSchema>}
     * @memberof ReferenceSchema
     */
    selfCites?: Array<SelfCiteSchema>;
    /**
     * 
     * @type {string}
     * @memberof ReferenceSchema
     */
    dataSource?: string;
}

/**
 * Check if a given object implements the ReferenceSchema interface.
 */
export function instanceOfReferenceSchema(value: object): boolean {
    if (!('source' in value)) return false;
    if (!('target' in value)) return false;
    return true;
}

export function ReferenceSchemaFromJSON(json: any): ReferenceSchema {
    return ReferenceSchemaFromJSONTyped(json, false);
}

export function ReferenceSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReferenceSchema {
    if (json == null) {
        return json;
    }
    return {
        
        'source': json['source'],
        'target': json['target'],
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'lastUpdated': json['lastUpdated'] == null ? undefined : (new Date(json['lastUpdated'])),
        'selfCites': json['selfCites'] == null ? undefined : ((json['selfCites'] as Array<any>).map(SelfCiteSchemaFromJSON)),
        'dataSource': json['dataSource'] == null ? undefined : json['dataSource'],
    };
}

export function ReferenceSchemaToJSON(value?: ReferenceSchema | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'source': value['source'],
        'target': value['target'],
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString().substring(0,10)),
        'lastUpdated': value['lastUpdated'] == null ? undefined : ((value['lastUpdated']).toISOString().substring(0,10)),
        'selfCites': value['selfCites'] == null ? undefined : ((value['selfCites'] as Array<any>).map(SelfCiteSchemaToJSON)),
        'dataSource': value['dataSource'],
    };
}

