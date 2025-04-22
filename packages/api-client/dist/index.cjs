"use strict";
const __rslib_import_meta_url__ = /*#__PURE__*/ (function () {
  return typeof document === 'undefined'
    ? new (require('url'.replace('', '')).URL)('file:' + __filename).href
    : (document.currentScript && document.currentScript.src) ||
      new URL('main.js', document.baseURI).href;
})();
;
// The require scope
var __webpack_require__ = {};

/************************************************************************/
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  HelloWorld: () => (/* reexport */ HelloWorld),
  httpClient: () => (/* reexport */ httpClient),
  configureApi: () => (/* reexport */ configureApi),
  HttpClient: () => (/* reexport */ HttpClient),
  Upload: () => (/* reexport */ Upload),
  helloWorld: () => (/* reexport */ helloWorld),
  upload: () => (/* reexport */ upload),
  ContentType: () => (/* reexport */ http_client_ContentType)
});

;// CONCATENATED MODULE: ./src/http-client.ts
/* eslint-disable */ /* tslint:disable */ // @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */ function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
const SUCCESS_CODE = 0;
var http_client_ContentType = /*#__PURE__*/ function(ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
    return ContentType;
}({});
class HttpClient {
    encodeQueryParam(key, value) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
    addQueryParam(query, key) {
        return this.encodeQueryParam(key, query[key]);
    }
    addArrayQueryParam(query, key) {
        const value = query[key];
        return value.map((v)=>this.encodeQueryParam(key, v)).join("&");
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key)=>"undefined" !== typeof query[key]);
        return keys.map((key)=>Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)).join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...params2 || {},
            headers: {
                ...this.baseApiParams.headers || {},
                ...params1.headers || {},
                ...params2 && params2.headers || {}
            }
        };
    }
    constructor(apiConfig = {}){
        _define_property(this, "baseUrl", "");
        _define_property(this, "securityData", null);
        _define_property(this, "securityWorker", void 0);
        _define_property(this, "abortControllers", new Map());
        _define_property(this, "customFetch", (...fetchParams)=>fetch(...fetchParams));
        _define_property(this, "baseApiParams", {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer"
        });
        _define_property(this, "setSecurityData", (data)=>{
            this.securityData = data;
        });
        _define_property(this, "contentFormatters", {
            ["application/json"]: (input)=>input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            ["text/plain"]: (input)=>input !== null && typeof input !== "string" ? JSON.stringify(input) : input,
            ["multipart/form-data"]: (input)=>{
                if (input instanceof FormData) {
                    return input;
                }
                return Object.keys(input || {}).reduce((formData, key)=>{
                    const property = input[key];
                    formData.append(key, property instanceof Blob ? property : typeof property === "object" && property !== null ? JSON.stringify(property) : `${property}`);
                    return formData;
                }, new FormData());
            },
            ["application/x-www-form-urlencoded"]: (input)=>this.toQueryString(input)
        });
        _define_property(this, "createAbortSignal", (cancelToken)=>{
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        });
        _define_property(this, "abortRequest", (cancelToken)=>{
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        });
        _define_property(this, "request", async ({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params })=>{
            const secureParams = (typeof secure === "boolean" ? secure : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || "application/json"];
            const responseFormat = format || requestParams.format;
            return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
                ...requestParams,
                headers: {
                    ...requestParams.headers || {},
                    ...type && type !== "multipart/form-data" ? {
                        "Content-Type": type
                    } : {}
                },
                signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
                body: typeof body === "undefined" || body === null ? null : payloadFormatter(body)
            }).then(async (response)=>{
                const r = response.clone();
                r.data = null;
                r.error = null;
                const data = !responseFormat ? r : await response[responseFormat]().then((data)=>{
                    if (r.ok) {
                        r.data = data;
                    } else {
                        r.error = data;
                    }
                    return r;
                }).catch((e)=>{
                    r.error = e;
                    return r;
                });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok) {
                    return [
                        data,
                        {
                            code: 500,
                            message: "error",
                            data: data
                        }
                    ];
                }
                const responseData = data.data;
                if (responseData && responseData.code === SUCCESS_CODE) {
                    return [
                        null,
                        responseData.data
                    ];
                }
                return [
                    responseData,
                    responseData
                ];
            });
        });
        Object.assign(this, apiConfig);
    }
}

;// CONCATENATED MODULE: ./src/HelloWorld.ts
/* eslint-disable */ /* tslint:disable */ // @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */ function HelloWorld_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class HelloWorld {
    constructor(http){
        HelloWorld_define_property(this, "http", void 0);
        /**
   * No description
   *
   * @tags hello-world
   * @name HelloWorldControllerGetHello
   * @summary 获取问候语
   * @request GET:/hello-world
   * @response `200` `HelloWorldControllerGetHelloData`
   */ HelloWorld_define_property(this, "helloWorldControllerGetHello", (query, params = {})=>this.http.request({
                path: `/hello-world`,
                method: "GET",
                query: query,
                format: "json",
                ...params
            }));
        /**
   * No description
   *
   * @tags hello-world
   * @name HelloWorldControllerPostHello
   * @summary 提交问候语
   * @request POST:/hello-world
   * @response `200` `HelloWorldControllerPostHelloData`
   */ HelloWorld_define_property(this, "helloWorldControllerPostHello", (data, params = {})=>this.http.request({
                path: `/hello-world`,
                method: "POST",
                body: data,
                type: http_client_ContentType.Json,
                format: "json",
                ...params
            }));
        this.http = http;
    }
}

;// CONCATENATED MODULE: ./src/Upload.ts
/* eslint-disable */ /* tslint:disable */ // @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */ function Upload_define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class Upload {
    constructor(http){
        Upload_define_property(this, "http", void 0);
        /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerInit
   * @summary 初始化文件上传
   * @request POST:/upload/init
   * @response `200` `UploadControllerInitData`
   */ Upload_define_property(this, "uploadControllerInit", (data, params = {})=>this.http.request({
                path: `/upload/init`,
                method: "POST",
                body: data,
                type: http_client_ContentType.Json,
                format: "json",
                ...params
            }));
        /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerUploadChunk
   * @summary 上传文件分片
   * @request POST:/upload/chunk
   * @response `200` `UploadControllerUploadChunkData`
   */ Upload_define_property(this, "uploadControllerUploadChunk", (params = {})=>this.http.request({
                path: `/upload/chunk`,
                method: "POST",
                format: "json",
                ...params
            }));
        /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerCheckStatus
   * @summary 检查上传状态
   * @request GET:/upload/status/{uploadId}
   * @response `200` `UploadControllerCheckStatusData`
   */ Upload_define_property(this, "uploadControllerCheckStatus", (uploadId, params = {})=>this.http.request({
                path: `/upload/status/${uploadId}`,
                method: "GET",
                format: "json",
                ...params
            }));
        /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerMerge
   * @summary 合并文件分片
   * @request POST:/upload/merge
   * @response `200` `UploadControllerMergeData`
   */ Upload_define_property(this, "uploadControllerMerge", (data, params = {})=>this.http.request({
                path: `/upload/merge`,
                method: "POST",
                body: data,
                type: http_client_ContentType.Json,
                format: "json",
                ...params
            }));
        this.http = http;
    }
}

;// CONCATENATED MODULE: ./src/api-client.ts

// 默认配置
const DEFAULT_BASE_URL = 'http://localhost:3000';
// 创建全局 HTTP 客户端实例
const httpClient = new HttpClient({
    baseUrl: DEFAULT_BASE_URL
});
// 配置基础 URL
function configureApi(baseURL) {
    httpClient.baseUrl = baseURL;
}
// 导出预配置的 API 实例


// 预配置的 API 实例
const helloWorld = new HelloWorld(httpClient);
const upload = new Upload(httpClient);

;// CONCATENATED MODULE: ./src/index.ts
// 自动生成的 API 统一导出文件





exports.ContentType = __webpack_exports__.ContentType;
exports.HelloWorld = __webpack_exports__.HelloWorld;
exports.HttpClient = __webpack_exports__.HttpClient;
exports.Upload = __webpack_exports__.Upload;
exports.configureApi = __webpack_exports__.configureApi;
exports.helloWorld = __webpack_exports__.helloWorld;
exports.httpClient = __webpack_exports__.httpClient;
exports.upload = __webpack_exports__.upload;
for(var __webpack_i__ in __webpack_exports__) {
  if(["ContentType","HelloWorld","HttpClient","Upload","configureApi","helloWorld","httpClient","upload"].indexOf(__webpack_i__) === -1) {
    exports[__webpack_i__] = __webpack_exports__[__webpack_i__];
  }
}
Object.defineProperty(exports, '__esModule', { value: true });
