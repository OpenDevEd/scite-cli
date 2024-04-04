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
import type { AggregationBucketSchema } from './AggregationBucketSchema';
import {
    AggregationBucketSchemaFromJSON,
    AggregationBucketSchemaFromJSONTyped,
    AggregationBucketSchemaToJSON,
} from './AggregationBucketSchema';
import type { DateBucket } from './DateBucket';
import {
    DateBucketFromJSON,
    DateBucketFromJSONTyped,
    DateBucketToJSON,
} from './DateBucket';

/**
 * 
 * @export
 * @interface AggregationSchema
 */
export interface AggregationSchema {
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    paperTypes?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    journals?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    topics?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    substances?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    meshDescriptors?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    editorialNotices?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    authors?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<AggregationBucketSchema>}
     * @memberof AggregationSchema
     */
    affiliations?: Array<AggregationBucketSchema>;
    /**
     * 
     * @type {Array<DateBucket>}
     * @memberof AggregationSchema
     */
    dateHistogram?: Array<DateBucket>;
    /**
     * 
     * @type {Array<DateBucket>}
     * @memberof AggregationSchema
     */
    citationTypeDateHistogram?: Array<DateBucket>;
    /**
     * 
     * @type {Date}
     * @memberof AggregationSchema
     */
    maxDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof AggregationSchema
     */
    minDate?: Date;
}

/**
 * Check if a given object implements the AggregationSchema interface.
 */
export function instanceOfAggregationSchema(value: object): boolean {
    return true;
}

export function AggregationSchemaFromJSON(json: any): AggregationSchema {
    return AggregationSchemaFromJSONTyped(json, false);
}

export function AggregationSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): AggregationSchema {
    if (json == null) {
        return json;
    }
    return {
        
        'paperTypes': json['paperTypes'] == null ? undefined : ((json['paperTypes'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'journals': json['journals'] == null ? undefined : ((json['journals'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'topics': json['topics'] == null ? undefined : ((json['topics'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'substances': json['substances'] == null ? undefined : ((json['substances'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'meshDescriptors': json['meshDescriptors'] == null ? undefined : ((json['meshDescriptors'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'editorialNotices': json['editorialNotices'] == null ? undefined : ((json['editorialNotices'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'authors': json['authors'] == null ? undefined : ((json['authors'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'affiliations': json['affiliations'] == null ? undefined : ((json['affiliations'] as Array<any>).map(AggregationBucketSchemaFromJSON)),
        'dateHistogram': json['dateHistogram'] == null ? undefined : ((json['dateHistogram'] as Array<any>).map(DateBucketFromJSON)),
        'citationTypeDateHistogram': json['citationTypeDateHistogram'] == null ? undefined : ((json['citationTypeDateHistogram'] as Array<any>).map(DateBucketFromJSON)),
        'maxDate': json['maxDate'] == null ? undefined : (new Date(json['maxDate'])),
        'minDate': json['minDate'] == null ? undefined : (new Date(json['minDate'])),
    };
}

export function AggregationSchemaToJSON(value?: AggregationSchema | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'paperTypes': value['paperTypes'] == null ? undefined : ((value['paperTypes'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'journals': value['journals'] == null ? undefined : ((value['journals'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'topics': value['topics'] == null ? undefined : ((value['topics'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'substances': value['substances'] == null ? undefined : ((value['substances'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'meshDescriptors': value['meshDescriptors'] == null ? undefined : ((value['meshDescriptors'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'editorialNotices': value['editorialNotices'] == null ? undefined : ((value['editorialNotices'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'authors': value['authors'] == null ? undefined : ((value['authors'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'affiliations': value['affiliations'] == null ? undefined : ((value['affiliations'] as Array<any>).map(AggregationBucketSchemaToJSON)),
        'dateHistogram': value['dateHistogram'] == null ? undefined : ((value['dateHistogram'] as Array<any>).map(DateBucketToJSON)),
        'citationTypeDateHistogram': value['citationTypeDateHistogram'] == null ? undefined : ((value['citationTypeDateHistogram'] as Array<any>).map(DateBucketToJSON)),
        'maxDate': value['maxDate'] == null ? undefined : ((value['maxDate']).toISOString()),
        'minDate': value['minDate'] == null ? undefined : ((value['minDate']).toISOString()),
    };
}

