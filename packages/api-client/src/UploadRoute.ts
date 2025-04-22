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

export namespace Upload {
  /**
   * No description
   * @tags Upload
   * @name UploadControllerInit
   * @summary 初始化文件上传
   * @request POST:/upload/init
   * @response `200` `UploadControllerInitData`
   */
  export namespace UploadControllerInit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InitUploadDto;
    export type RequestHeaders = {};
    export type ResponseBody = UploadControllerInitData;
  }

  /**
   * No description
   * @tags Upload
   * @name UploadControllerUploadChunk
   * @summary 上传文件分片
   * @request POST:/upload/chunk
   * @response `200` `UploadControllerUploadChunkData`
   */
  export namespace UploadControllerUploadChunk {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /**
       * 上传ID
       * @example "upload_123456789"
       */
      "x-upload-id": string;
      /**
       * 分片索引
       * @example 0
       */
      "x-chunk-index": number;
      /**
       * 分片哈希值
       * @example "abc123def456"
       */
      "x-chunk-hash": string;
    };
    export type ResponseBody = UploadControllerUploadChunkData;
  }

  /**
   * No description
   * @tags Upload
   * @name UploadControllerCheckStatus
   * @summary 检查上传状态
   * @request GET:/upload/status/{uploadId}
   * @response `200` `UploadControllerCheckStatusData`
   */
  export namespace UploadControllerCheckStatus {
    export type RequestParams = {
      /** 上传ID */
      uploadId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UploadControllerCheckStatusData;
  }

  /**
   * No description
   * @tags Upload
   * @name UploadControllerMerge
   * @summary 合并文件分片
   * @request POST:/upload/merge
   * @response `200` `UploadControllerMergeData`
   */
  export namespace UploadControllerMerge {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MergeChunksDto;
    export type RequestHeaders = {};
    export type ResponseBody = UploadControllerMergeData;
  }
}
