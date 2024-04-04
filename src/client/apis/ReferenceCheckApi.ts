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
  ResultUrlResponse,
  ScheduleResponse,
  TaskResponse,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    ResultUrlResponseFromJSON,
    ResultUrlResponseToJSON,
    ScheduleResponseFromJSON,
    ScheduleResponseToJSON,
    TaskResponseFromJSON,
    TaskResponseToJSON,
} from '../models/index';

export interface CancelTaskReferenceCheckTasksTaskIdCancelGetRequest {
    taskId: string;
    authorization?: string;
}

export interface GetResultReferenceCheckTasksTaskIdGetRequest {
    taskId: string;
    authorization?: string;
}

export interface GetResultUrlReferenceCheckTasksTaskIdResultUrlGetRequest {
    taskId: string;
    authorization?: string;
}

export interface PostReferenceCheckReferenceCheckPostRequest {
    fileUrl?: string;
    pdfUrl?: string;
    uploadFor?: PostReferenceCheckReferenceCheckPostUploadForEnum;
    authorization?: string;
    file?: Blob;
    pdf?: Blob;
}

/**
 * 
 */
export class ReferenceCheckApi extends runtime.BaseAPI {

    /**
     * Cancel task that is scheduled/in progress.  Once a task is successfully canceled its status will be `CANCELLED`.
     * Cancel Task
     */
    async cancelTaskReferenceCheckTasksTaskIdCancelGetRaw(requestParameters: CancelTaskReferenceCheckTasksTaskIdCancelGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['taskId'] == null) {
            throw new runtime.RequiredError(
                'taskId',
                'Required parameter "taskId" was null or undefined when calling cancelTaskReferenceCheckTasksTaskIdCancelGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/reference_check/tasks/{task_id}/cancel`.replace(`{${"task_id"}}`, encodeURIComponent(String(requestParameters['taskId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Cancel task that is scheduled/in progress.  Once a task is successfully canceled its status will be `CANCELLED`.
     * Cancel Task
     */
    async cancelTaskReferenceCheckTasksTaskIdCancelGet(requestParameters: CancelTaskReferenceCheckTasksTaskIdCancelGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.cancelTaskReferenceCheckTasksTaskIdCancelGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve reference check job status.  This allows both fetching the job result and polling for job completion.  Whilst the job is in progress its status will be either `PENDING` or `STARTED`.  Once the job is complete its status will be `SUCCESS` and the result can be read under the `result` key of this response.
     * Get Result
     */
    async getResultReferenceCheckTasksTaskIdGetRaw(requestParameters: GetResultReferenceCheckTasksTaskIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TaskResponse>> {
        if (requestParameters['taskId'] == null) {
            throw new runtime.RequiredError(
                'taskId',
                'Required parameter "taskId" was null or undefined when calling getResultReferenceCheckTasksTaskIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/reference_check/tasks/{task_id}`.replace(`{${"task_id"}}`, encodeURIComponent(String(requestParameters['taskId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TaskResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve reference check job status.  This allows both fetching the job result and polling for job completion.  Whilst the job is in progress its status will be either `PENDING` or `STARTED`.  Once the job is complete its status will be `SUCCESS` and the result can be read under the `result` key of this response.
     * Get Result
     */
    async getResultReferenceCheckTasksTaskIdGet(requestParameters: GetResultReferenceCheckTasksTaskIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TaskResponse> {
        const response = await this.getResultReferenceCheckTasksTaskIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get URL for task result.
     * Get Result Url
     */
    async getResultUrlReferenceCheckTasksTaskIdResultUrlGetRaw(requestParameters: GetResultUrlReferenceCheckTasksTaskIdResultUrlGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ResultUrlResponse>> {
        if (requestParameters['taskId'] == null) {
            throw new runtime.RequiredError(
                'taskId',
                'Required parameter "taskId" was null or undefined when calling getResultUrlReferenceCheckTasksTaskIdResultUrlGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/reference_check/tasks/{task_id}/result_url`.replace(`{${"task_id"}}`, encodeURIComponent(String(requestParameters['taskId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ResultUrlResponseFromJSON(jsonValue));
    }

    /**
     * Get URL for task result.
     * Get Result Url
     */
    async getResultUrlReferenceCheckTasksTaskIdResultUrlGet(requestParameters: GetResultUrlReferenceCheckTasksTaskIdResultUrlGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ResultUrlResponse> {
        const response = await this.getResultUrlReferenceCheckTasksTaskIdResultUrlGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Schedule a document for processing.  Can either supply a PDF or docx file directly as a `multipart/form-data` upload, or specify a URL where the file can be downloaded.
     * Post Reference Check
     */
    async postReferenceCheckReferenceCheckPostRaw(requestParameters: PostReferenceCheckReferenceCheckPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ScheduleResponse>> {
        const queryParameters: any = {};

        if (requestParameters['fileUrl'] != null) {
            queryParameters['file_url'] = requestParameters['fileUrl'];
        }

        if (requestParameters['pdfUrl'] != null) {
            queryParameters['pdf_url'] = requestParameters['pdfUrl'];
        }

        if (requestParameters['uploadFor'] != null) {
            queryParameters['upload_for'] = requestParameters['uploadFor'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['authorization'] = String(requestParameters['authorization']);
        }

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['file'] != null) {
            formParams.append('file', requestParameters['file'] as any);
        }

        if (requestParameters['pdf'] != null) {
            formParams.append('pdf', requestParameters['pdf'] as any);
        }

        const response = await this.request({
            path: `/reference_check`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ScheduleResponseFromJSON(jsonValue));
    }

    /**
     * Schedule a document for processing.  Can either supply a PDF or docx file directly as a `multipart/form-data` upload, or specify a URL where the file can be downloaded.
     * Post Reference Check
     */
    async postReferenceCheckReferenceCheckPost(requestParameters: PostReferenceCheckReferenceCheckPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ScheduleResponse> {
        const response = await this.postReferenceCheckReferenceCheckPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const PostReferenceCheckReferenceCheckPostUploadForEnum = {
    Assistant: 'assistant',
    ReferenceCheck: 'reference-check'
} as const;
export type PostReferenceCheckReferenceCheckPostUploadForEnum = typeof PostReferenceCheckReferenceCheckPostUploadForEnum[keyof typeof PostReferenceCheckReferenceCheckPostUploadForEnum];
