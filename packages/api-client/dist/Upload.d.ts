import { InitUploadDto, MergeChunksDto, UploadControllerCheckStatusData, UploadControllerInitData, UploadControllerMergeData, UploadControllerUploadChunkData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";
export declare class Upload<SecurityDataType = unknown> {
    http: HttpClient<SecurityDataType>;
    constructor(http: HttpClient<SecurityDataType>);
    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerInit
     * @summary 初始化文件上传
     * @request POST:/upload/init
     * @response `200` `UploadControllerInitData`
     */
    uploadControllerInit: (data: InitUploadDto, params?: RequestParams) => Promise<[null, import("./data-contracts").InitUploadResponseDto | undefined] | [UploadControllerInitData, UploadControllerInitData]>;
    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadChunk
     * @summary 上传文件分片
     * @request POST:/upload/chunk
     * @response `200` `UploadControllerUploadChunkData`
     */
    uploadControllerUploadChunk: (params?: RequestParams) => Promise<[null, import("./data-contracts").UploadChunkResponseDto | undefined] | [UploadControllerUploadChunkData, UploadControllerUploadChunkData]>;
    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerCheckStatus
     * @summary 检查上传状态
     * @request GET:/upload/status/{uploadId}
     * @response `200` `UploadControllerCheckStatusData`
     */
    uploadControllerCheckStatus: (uploadId: string, params?: RequestParams) => Promise<[null, import("./data-contracts").CheckUploadStatusResponseDto | undefined] | [UploadControllerCheckStatusData, UploadControllerCheckStatusData]>;
    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerMerge
     * @summary 合并文件分片
     * @request POST:/upload/merge
     * @response `200` `UploadControllerMergeData`
     */
    uploadControllerMerge: (data: MergeChunksDto, params?: RequestParams) => Promise<[null, import("./data-contracts").MergeChunksResponseDto | undefined] | [UploadControllerMergeData, UploadControllerMergeData]>;
}
