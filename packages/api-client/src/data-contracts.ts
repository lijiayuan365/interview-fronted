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

export interface HelloWorldControllerGetHelloParams {
  name: string;
}

export type HelloWorldControllerGetHelloData = ApiResponseDto & {
  data?: HelloResponseDto;
};

export type HelloWorldControllerPostHelloData = ApiResponseDto & {
  data?: HelloResponseDto;
};
