import { HelloRequestDto, HelloWorldControllerGetHelloData, HelloWorldControllerGetHelloParams, HelloWorldControllerPostHelloData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";
export declare class HelloWorld<SecurityDataType = unknown> {
    http: HttpClient<SecurityDataType>;
    constructor(http: HttpClient<SecurityDataType>);
    /**
     * No description
     *
     * @tags hello-world
     * @name HelloWorldControllerGetHello
     * @summary 获取问候语
     * @request GET:/hello-world
     * @response `200` `HelloWorldControllerGetHelloData`
     */
    helloWorldControllerGetHello: (query: HelloWorldControllerGetHelloParams, params?: RequestParams) => Promise<[null, import("./data-contracts").HelloResponseDto | undefined] | [HelloWorldControllerGetHelloData, HelloWorldControllerGetHelloData]>;
    /**
     * No description
     *
     * @tags hello-world
     * @name HelloWorldControllerPostHello
     * @summary 提交问候语
     * @request POST:/hello-world
     * @response `200` `HelloWorldControllerPostHelloData`
     */
    helloWorldControllerPostHello: (data: HelloRequestDto, params?: RequestParams) => Promise<[null, import("./data-contracts").HelloResponseDto | undefined] | [HelloWorldControllerPostHelloData, HelloWorldControllerPostHelloData]>;
}
