import { HelloRequestDto, HelloWorldControllerGetHelloData, HelloWorldControllerPostHelloData } from "./data-contracts";
export declare namespace HelloWorld {
    /**
     * No description
     * @tags hello-world
     * @name HelloWorldControllerGetHello
     * @summary 获取问候语
     * @request GET:/hello-world
     * @response `200` `HelloWorldControllerGetHelloData`
     */
    namespace HelloWorldControllerGetHello {
        type RequestParams = {};
        type RequestQuery = {
            name: string;
        };
        type RequestBody = never;
        type RequestHeaders = {};
        type ResponseBody = HelloWorldControllerGetHelloData;
    }
    /**
     * No description
     * @tags hello-world
     * @name HelloWorldControllerPostHello
     * @summary 提交问候语
     * @request POST:/hello-world
     * @response `200` `HelloWorldControllerPostHelloData`
     */
    namespace HelloWorldControllerPostHello {
        type RequestParams = {};
        type RequestQuery = {};
        type RequestBody = HelloRequestDto;
        type RequestHeaders = {};
        type ResponseBody = HelloWorldControllerPostHelloData;
    }
}
