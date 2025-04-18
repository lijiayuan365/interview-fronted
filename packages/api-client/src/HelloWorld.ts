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
  HelloWorldControllerGetHelloParams,
  HelloWorldControllerPostHelloData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class HelloWorld<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags hello-world
   * @name HelloWorldControllerGetHello
   * @summary 获取问候语
   * @request GET:/hello-world
   * @response `200` `HelloWorldControllerGetHelloData`
   */
  helloWorldControllerGetHello = (
    query: HelloWorldControllerGetHelloParams,
    params: RequestParams = {},
  ) =>
    this.http.request<HelloWorldControllerGetHelloData, any>({
      path: `/hello-world`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags hello-world
   * @name HelloWorldControllerPostHello
   * @summary 提交问候语
   * @request POST:/hello-world
   * @response `200` `HelloWorldControllerPostHelloData`
   */
  helloWorldControllerPostHello = (
    data: HelloRequestDto,
    params: RequestParams = {},
  ) =>
    this.http.request<HelloWorldControllerPostHelloData, any>({
      path: `/hello-world`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
