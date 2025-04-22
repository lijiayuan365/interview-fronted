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

export interface ApiResponseDto {
  /** @example 0 */
  code: number;
  /** @example "success" */
  message: string;
}

export interface HelloResponseDto {
  /**
   * Hello消息
   * @example "Hello World!"
   */
  message: string;
}

export interface HelloRequestDto {
  /**
   * 名称
   * @example "World"
   */
  name: string;
}

export interface InitUploadResponseDto {
  /**
   * 上传ID
   * @example "upload_123456789"
   */
  uploadId: string;
  /**
   * 已上传的分片索引列表
   * @example [0,1,2]
   */
  uploadedChunks: number[];
  /**
   * 是否为续传
   * @example true
   */
  isResume: boolean;
  /**
   * 分片大小
   * @example 1024000
   */
  chunkSize: number;
}

export interface InitUploadDto {
  /**
   * 文件名
   * @example "example.mp4"
   */
  fileName: string;
  /**
   * 文件大小（字节）
   * @example 1024000
   */
  fileSize: number;
  /**
   * 文件哈希值（用于验证文件完整性）
   * @example "e7c22b994c59d9cf2b48e549b1e24666"
   */
  fileHash: string;
  /**
   * 用户ID（可选）
   * @example "user123"
   */
  userId?: string;
}

export interface UploadChunkResponseDto {
  /**
   * 分片是否上传成功
   * @example true
   */
  success: boolean;
  /**
   * 已上传的分片数量
   * @example 5
   */
  uploadedChunks: number;
  /**
   * 总分片数量
   * @example 10
   */
  totalChunks: number;
  /**
   * 是否所有分片都已上传完成
   * @example false
   */
  isComplete: boolean;
}

export interface CheckUploadStatusResponseDto {
  /**
   * 是否完成
   * @example false
   */
  isComplete: boolean;
  /**
   * 已上传分片数量
   * @example 5
   */
  uploadedChunksCount: number;
  /**
   * 总分片数量
   * @example 10
   */
  totalChunks: number;
  /**
   * 未上传的分片索引数组
   * @example [5,6,7,8,9]
   */
  missingChunks: number[];
}

export interface MergeChunksResponseDto {
  /**
   * 合并是否成功
   * @example true
   */
  success: boolean;
  /**
   * 文件名
   * @example "example.mp4"
   */
  fileName: string;
  /**
   * 文件大小
   * @example 1024000
   */
  fileSize: number;
  /**
   * 文件路径
   * @example "_upload/550e8400-e29b-41d4-a716-446655440000/example.mp4"
   */
  filePath: string;
}

export interface MergeChunksDto {
  /**
   * 上传ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  uploadId: string;
}

export interface HelloWorldControllerGetHelloParams {
  name: string;
}

export type HelloWorldControllerGetHelloData = ApiResponseDto & {
  data?: HelloResponseDto;
};

export type HelloWorldControllerPostHelloData = ApiResponseDto & {
  data?: HelloResponseDto;
};

export type UploadControllerInitData = ApiResponseDto & {
  data?: InitUploadResponseDto;
};

export type UploadControllerUploadChunkData = ApiResponseDto & {
  data?: UploadChunkResponseDto;
};

export type UploadControllerCheckStatusData = ApiResponseDto & {
  data?: CheckUploadStatusResponseDto;
};

export type UploadControllerMergeData = ApiResponseDto & {
  data?: MergeChunksResponseDto;
};
