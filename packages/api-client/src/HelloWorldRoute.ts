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
  HelloRequestDto,
  HelloWorldControllerGetHelloData,
  HelloWorldControllerPostHelloData,
} from "./data-contracts";

export namespace HelloWorld {
  /**
   * No description
   * @tags hello-world
   * @name HelloWorldControllerGetHello
   * @summary 获取问候语
   * @request GET:/hello-world
   * @response `200` `HelloWorldControllerGetHelloData`
   */
  export namespace HelloWorldControllerGetHello {
    export type RequestParams = {};
    export type RequestQuery = {
      name: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = HelloWorldControllerGetHelloData;
  }

  /**
   * No description
   * @tags hello-world
   * @name HelloWorldControllerPostHello
   * @summary 提交问候语
   * @request POST:/hello-world
   * @response `200` `HelloWorldControllerPostHelloData`
   */
  export namespace HelloWorldControllerPostHello {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = HelloRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = HelloWorldControllerPostHelloData;
  }
}
