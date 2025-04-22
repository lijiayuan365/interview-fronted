import { InitUploadDto, MergeChunksDto, UploadControllerCheckStatusData, UploadControllerInitData, UploadControllerMergeData, UploadControllerUploadChunkData } from "./data-contracts";
export declare namespace Upload {
    /**
     * No description
     * @tags Upload
     * @name UploadControllerInit
     * @summary 初始化文件上传
     * @request POST:/upload/init
     * @response `200` `UploadControllerInitData`
     */
    namespace UploadControllerInit {
        type RequestParams = {};
        type RequestQuery = {};
        type RequestBody = InitUploadDto;
        type RequestHeaders = {};
        type ResponseBody = UploadControllerInitData;
    }
    /**
     * No description
     * @tags Upload
     * @name UploadControllerUploadChunk
     * @summary 上传文件分片
     * @request POST:/upload/chunk
     * @response `200` `UploadControllerUploadChunkData`
     */
    namespace UploadControllerUploadChunk {
        type RequestParams = {};
        type RequestQuery = {};
        type RequestBody = never;
        type RequestHeaders = {
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
        type ResponseBody = UploadControllerUploadChunkData;
    }
    /**
     * No description
     * @tags Upload
     * @name UploadControllerCheckStatus
     * @summary 检查上传状态
     * @request GET:/upload/status/{uploadId}
     * @response `200` `UploadControllerCheckStatusData`
     */
    namespace UploadControllerCheckStatus {
        type RequestParams = {
            /** 上传ID */
            uploadId: string;
        };
        type RequestQuery = {};
        type RequestBody = never;
        type RequestHeaders = {};
        type ResponseBody = UploadControllerCheckStatusData;
    }
    /**
     * No description
     * @tags Upload
     * @name UploadControllerMerge
     * @summary 合并文件分片
     * @request POST:/upload/merge
     * @response `200` `UploadControllerMergeData`
     */
    namespace UploadControllerMerge {
        type RequestParams = {};
        type RequestQuery = {};
        type RequestBody = MergeChunksDto;
        type RequestHeaders = {};
        type ResponseBody = UploadControllerMergeData;
    }
}
