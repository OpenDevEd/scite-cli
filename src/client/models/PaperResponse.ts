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
import type { CitingTallySourceDB } from './CitingTallySourceDB';
import {
    CitingTallySourceDBFromJSON,
    CitingTallySourceDBFromJSONTyped,
    CitingTallySourceDBToJSON,
} from './CitingTallySourceDB';
import type { EditorialNoticeSchema } from './EditorialNoticeSchema';
import {
    EditorialNoticeSchemaFromJSON,
    EditorialNoticeSchemaFromJSONTyped,
    EditorialNoticeSchemaToJSON,
} from './EditorialNoticeSchema';
import type { PreprintLinkSchema } from './PreprintLinkSchema';
import {
    PreprintLinkSchemaFromJSON,
    PreprintLinkSchemaFromJSONTyped,
    PreprintLinkSchemaToJSON,
} from './PreprintLinkSchema';
import type { PublicationLinkSchema } from './PublicationLinkSchema';
import {
    PublicationLinkSchemaFromJSON,
    PublicationLinkSchemaFromJSONTyped,
    PublicationLinkSchemaToJSON,
} from './PublicationLinkSchema';
import type { TallyDB } from './TallyDB';
import {
    TallyDBFromJSON,
    TallyDBFromJSONTyped,
    TallyDBToJSON,
} from './TallyDB';

/**
 * The 'Paper' object we expose to API users
 * including extra properties from tables other
 * than doidata.
 * 
 * Note that some properties from PaperDB objects
 * are needed to construct some of the properties here,
 * but will not be included in the deserialized/exposed version.
 * @export
 * @interface PaperResponse
 */
export interface PaperResponse {
    /**
     * 
     * @type {number}
     * @memberof PaperResponse
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    doi: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    _abstract?: string;
    /**
     * 
     * @type {Array<AuthorSchema>}
     * @memberof PaperResponse
     */
    authors?: Array<AuthorSchema>;
    /**
     * 
     * @type {Array<string>}
     * @memberof PaperResponse
     */
    keywords?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof PaperResponse
     */
    year?: number;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    shortJournal?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    publisher?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    issue?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    volume?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    page?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    pmPublicationType?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PaperResponse
     */
    retracted?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PaperResponse
     */
    memberId?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof PaperResponse
     */
    issns?: Array<string>;
    /**
     * 
     * @type {TallyDB}
     * @memberof PaperResponse
     */
    tally?: TallyDB;
    /**
     * 
     * @type {CitingTallySourceDB}
     * @memberof PaperResponse
     */
    citingTally?: CitingTallySourceDB;
    /**
     * 
     * @type {Array<EditorialNoticeSchema>}
     * @memberof PaperResponse
     */
    editorialNotices?: Array<EditorialNoticeSchema>;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    journalSlug?: string;
    /**
     * 
     * @type {string}
     * @memberof PaperResponse
     */
    journal?: string;
    /**
     * 
     * @type {Array<PreprintLinkSchema>}
     * @memberof PaperResponse
     */
    preprintLinks?: Array<PreprintLinkSchema>;
    /**
     * 
     * @type {Array<PublicationLinkSchema>}
     * @memberof PaperResponse
     */
    publicationLinks?: Array<PublicationLinkSchema>;
    /**
     * 
     * @type {Array<string>}
     * @memberof PaperResponse
     */
    normalizedTypes?: Array<string>;
}

/**
 * Check if a given object implements the PaperResponse interface.
 */
export function instanceOfPaperResponse(value: object): boolean {
    if (!('doi' in value)) return false;
    return true;
}

export function PaperResponseFromJSON(json: any): PaperResponse {
    return PaperResponseFromJSONTyped(json, false);
}

export function PaperResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaperResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'doi': json['doi'],
        'slug': json['slug'] == null ? undefined : json['slug'],
        'type': json['type'] == null ? undefined : json['type'],
        'title': json['title'] == null ? undefined : json['title'],
        '_abstract': json['abstract'] == null ? undefined : json['abstract'],
        'authors': json['authors'] == null ? undefined : ((json['authors'] as Array<any>).map(AuthorSchemaFromJSON)),
        'keywords': json['keywords'] == null ? undefined : json['keywords'],
        'year': json['year'] == null ? undefined : json['year'],
        'shortJournal': json['shortJournal'] == null ? undefined : json['shortJournal'],
        'publisher': json['publisher'] == null ? undefined : json['publisher'],
        'issue': json['issue'] == null ? undefined : json['issue'],
        'volume': json['volume'] == null ? undefined : json['volume'],
        'page': json['page'] == null ? undefined : json['page'],
        'pmPublicationType': json['pmPublicationType'] == null ? undefined : json['pmPublicationType'],
        'retracted': json['retracted'] == null ? undefined : json['retracted'],
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
        'issns': json['issns'] == null ? undefined : json['issns'],
        'tally': json['tally'] == null ? undefined : TallyDBFromJSON(json['tally']),
        'citingTally': json['citingTally'] == null ? undefined : CitingTallySourceDBFromJSON(json['citingTally']),
        'editorialNotices': json['editorialNotices'] == null ? undefined : ((json['editorialNotices'] as Array<any>).map(EditorialNoticeSchemaFromJSON)),
        'journalSlug': json['journalSlug'] == null ? undefined : json['journalSlug'],
        'journal': json['journal'] == null ? undefined : json['journal'],
        'preprintLinks': json['preprintLinks'] == null ? undefined : ((json['preprintLinks'] as Array<any>).map(PreprintLinkSchemaFromJSON)),
        'publicationLinks': json['publicationLinks'] == null ? undefined : ((json['publicationLinks'] as Array<any>).map(PublicationLinkSchemaFromJSON)),
        'normalizedTypes': json['normalizedTypes'] == null ? undefined : json['normalizedTypes'],
    };
}

export function PaperResponseToJSON(value?: PaperResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'doi': value['doi'],
        'slug': value['slug'],
        'type': value['type'],
        'title': value['title'],
        'abstract': value['_abstract'],
        'authors': value['authors'] == null ? undefined : ((value['authors'] as Array<any>).map(AuthorSchemaToJSON)),
        'keywords': value['keywords'],
        'year': value['year'],
        'shortJournal': value['shortJournal'],
        'publisher': value['publisher'],
        'issue': value['issue'],
        'volume': value['volume'],
        'page': value['page'],
        'pmPublicationType': value['pmPublicationType'],
        'retracted': value['retracted'],
        'memberId': value['memberId'],
        'issns': value['issns'],
        'tally': TallyDBToJSON(value['tally']),
        'citingTally': CitingTallySourceDBToJSON(value['citingTally']),
        'editorialNotices': value['editorialNotices'] == null ? undefined : ((value['editorialNotices'] as Array<any>).map(EditorialNoticeSchemaToJSON)),
        'journalSlug': value['journalSlug'],
        'journal': value['journal'],
        'preprintLinks': value['preprintLinks'] == null ? undefined : ((value['preprintLinks'] as Array<any>).map(PreprintLinkSchemaToJSON)),
        'publicationLinks': value['publicationLinks'] == null ? undefined : ((value['publicationLinks'] as Array<any>).map(PublicationLinkSchemaToJSON)),
        'normalizedTypes': value['normalizedTypes'],
    };
}

