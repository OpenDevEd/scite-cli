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
import type { AuthorResults } from './AuthorResults';
import {
    AuthorResultsFromJSON,
    AuthorResultsFromJSONTyped,
    AuthorResultsToJSON,
} from './AuthorResults';
import type { CitationSearch } from './CitationSearch';
import {
    CitationSearchFromJSON,
    CitationSearchFromJSONTyped,
    CitationSearchToJSON,
} from './CitationSearch';
import type { EditorialNoticeSchema } from './EditorialNoticeSchema';
import {
    EditorialNoticeSchemaFromJSON,
    EditorialNoticeSchemaFromJSONTyped,
    EditorialNoticeSchemaToJSON,
} from './EditorialNoticeSchema';
import type { PubmedMeshTypeResponse } from './PubmedMeshTypeResponse';
import {
    PubmedMeshTypeResponseFromJSON,
    PubmedMeshTypeResponseFromJSONTyped,
    PubmedMeshTypeResponseToJSON,
} from './PubmedMeshTypeResponse';
import type { TallyResponse } from './TallyResponse';
import {
    TallyResponseFromJSON,
    TallyResponseFromJSONTyped,
    TallyResponseToJSON,
} from './TallyResponse';

/**
 * 
 * @export
 * @interface SearchResultSchema
 */
export interface SearchResultSchema {
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    doi?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    slug?: string;
    /**
     * 
     * @type {Array<AuthorResults>}
     * @memberof SearchResultSchema
     */
    authors?: Array<AuthorResults>;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    journal?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    shortJournal?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    publisher?: string;
    /**
     * 
     * @type {number}
     * @memberof SearchResultSchema
     */
    memberId?: number;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    _abstract?: string;
    /**
     * 
     * @type {number}
     * @memberof SearchResultSchema
     */
    year?: number;
    /**
     * 
     * @type {Date}
     * @memberof SearchResultSchema
     */
    date?: Date;
    /**
     * 
     * @type {number}
     * @memberof SearchResultSchema
     */
    lastUpdate?: number;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    volume?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    issue?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    page?: string;
    /**
     * 
     * @type {TallyResponse}
     * @memberof SearchResultSchema
     */
    tally?: TallyResponse;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchResultSchema
     */
    issns?: Array<string>;
    /**
     * 
     * @type {Array<EditorialNoticeSchema>}
     * @memberof SearchResultSchema
     */
    editorialNotices?: Array<EditorialNoticeSchema>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchResultSchema
     */
    normalizedTypes?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResultSchema
     */
    isOa?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SearchResultSchema
     */
    oaStatus?: string;
    /**
     * 
     * @type {Array<PubmedMeshTypeResponse>}
     * @memberof SearchResultSchema
     */
    meshTypes?: Array<PubmedMeshTypeResponse>;
    /**
     * 
     * @type {Array<CitationSearch>}
     * @memberof SearchResultSchema
     */
    citations?: Array<CitationSearch>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SearchResultSchema
     */
    highlightedFields?: Array<string>;
}

/**
 * Check if a given object implements the SearchResultSchema interface.
 */
export function instanceOfSearchResultSchema(value: object): boolean {
    return true;
}

export function SearchResultSchemaFromJSON(json: any): SearchResultSchema {
    return SearchResultSchemaFromJSONTyped(json, false);
}

export function SearchResultSchemaFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchResultSchema {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'doi': json['doi'] == null ? undefined : json['doi'],
        'title': json['title'] == null ? undefined : json['title'],
        'slug': json['slug'] == null ? undefined : json['slug'],
        'authors': json['authors'] == null ? undefined : ((json['authors'] as Array<any>).map(AuthorResultsFromJSON)),
        'journal': json['journal'] == null ? undefined : json['journal'],
        'shortJournal': json['shortJournal'] == null ? undefined : json['shortJournal'],
        'publisher': json['publisher'] == null ? undefined : json['publisher'],
        'memberId': json['memberId'] == null ? undefined : json['memberId'],
        '_abstract': json['abstract'] == null ? undefined : json['abstract'],
        'year': json['year'] == null ? undefined : json['year'],
        'date': json['date'] == null ? undefined : (new Date(json['date'])),
        'lastUpdate': json['lastUpdate'] == null ? undefined : json['lastUpdate'],
        'volume': json['volume'] == null ? undefined : json['volume'],
        'issue': json['issue'] == null ? undefined : json['issue'],
        'page': json['page'] == null ? undefined : json['page'],
        'tally': json['tally'] == null ? undefined : TallyResponseFromJSON(json['tally']),
        'issns': json['issns'] == null ? undefined : json['issns'],
        'editorialNotices': json['editorialNotices'] == null ? undefined : ((json['editorialNotices'] as Array<any>).map(EditorialNoticeSchemaFromJSON)),
        'normalizedTypes': json['normalizedTypes'] == null ? undefined : json['normalizedTypes'],
        'isOa': json['isOa'] == null ? undefined : json['isOa'],
        'oaStatus': json['oaStatus'] == null ? undefined : json['oaStatus'],
        'meshTypes': json['meshTypes'] == null ? undefined : ((json['meshTypes'] as Array<any>).map(PubmedMeshTypeResponseFromJSON)),
        'citations': json['citations'] == null ? undefined : ((json['citations'] as Array<any>).map(CitationSearchFromJSON)),
        'highlightedFields': json['highlightedFields'] == null ? undefined : json['highlightedFields'],
    };
}

export function SearchResultSchemaToJSON(value?: SearchResultSchema | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'doi': value['doi'],
        'title': value['title'],
        'slug': value['slug'],
        'authors': value['authors'] == null ? undefined : ((value['authors'] as Array<any>).map(AuthorResultsToJSON)),
        'journal': value['journal'],
        'shortJournal': value['shortJournal'],
        'publisher': value['publisher'],
        'memberId': value['memberId'],
        'abstract': value['_abstract'],
        'year': value['year'],
        'date': value['date'] == null ? undefined : ((value['date']).toISOString().substring(0,10)),
        'lastUpdate': value['lastUpdate'],
        'volume': value['volume'],
        'issue': value['issue'],
        'page': value['page'],
        'tally': TallyResponseToJSON(value['tally']),
        'issns': value['issns'],
        'editorialNotices': value['editorialNotices'] == null ? undefined : ((value['editorialNotices'] as Array<any>).map(EditorialNoticeSchemaToJSON)),
        'normalizedTypes': value['normalizedTypes'],
        'isOa': value['isOa'],
        'oaStatus': value['oaStatus'],
        'meshTypes': value['meshTypes'] == null ? undefined : ((value['meshTypes'] as Array<any>).map(PubmedMeshTypeResponseToJSON)),
        'citations': value['citations'] == null ? undefined : ((value['citations'] as Array<any>).map(CitationSearchToJSON)),
        'highlightedFields': value['highlightedFields'],
    };
}

