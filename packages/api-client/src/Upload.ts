/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  InitUploadDto,
  MergeChunksDto,
  UploadControllerCheckStatusData,
  UploadControllerInitData,
  UploadControllerMergeData,
  UploadControllerUploadChunkData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Upload<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerInit
   * @summary 初始化文件上传
   * @request POST:/upload/init
   * @response `200` `UploadControllerInitData`
   */
  uploadControllerInit = (data: InitUploadDto, params: RequestParams = {}) =>
    this.http.request<UploadControllerInitData, any>({
      path: `/upload/init`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerUploadChunk
   * @summary 上传文件分片
   * @request POST:/upload/chunk
   * @response `200` `UploadControllerUploadChunkData`
   */
  uploadControllerUploadChunk = (params: RequestParams = {}) =>
    this.http.request<UploadControllerUploadChunkData, any>({
      path: `/upload/chunk`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerCheckStatus
   * @summary 检查上传状态
   * @request GET:/upload/status/{uploadId}
   * @response `200` `UploadControllerCheckStatusData`
   */
  uploadControllerCheckStatus = (
    uploadId: string,
    params: RequestParams = {},
  ) =>
    this.http.request<UploadControllerCheckStatusData, any>({
      path: `/upload/status/${uploadId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerMerge
   * @summary 合并文件分片
   * @request POST:/upload/merge
   * @response `200` `UploadControllerMergeData`
   */
  uploadControllerMerge = (data: MergeChunksDto, params: RequestParams = {}) =>
    this.http.request<UploadControllerMergeData, any>({
      path: `/upload/merge`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
