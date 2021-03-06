/*
 * Licensed to Laurent Broudoux (the "Author") under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. Author licenses this
 * file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
export class Api {
  name: string;
  version: string;
  resource: string;
}

export class Metadata {
  createdOn: number;
  lastUpdate: number;
  annotations: any;
  labels: any;
}

export class Service {
  id: string;
  name: string;
  version: string;
  xmlNS: string;
  type: ServiceType;
  operations: Operation[];
  metadata: Metadata;
}
export enum ServiceType {
  SOAP_HTTP = "SOAP_HTTP",
  REST = "REST",
  GENERIC_REST = "GENERIC_REST"
}

export class Operation {
  name: string;
  method: string;
  inputName: string;
  outputName: string;
  dispatcher: string;
  dispatcherRules: string;
  defaultDelay: number;
  resourcePaths: string[];
  parameterConstraints: ParameterConstraint[];
}

export class OperationMutableProperties {
  dispatcher: string;
  dispatcherRules: string;
  defaultDelay: number;
  parameterConstraints: ParameterConstraint[];
}
export class ParameterConstraint {
  name: string;
  in: ParameterLocation;
  required: boolean;
  recopy: boolean;
  mustMatchRegexp: string;
}
export enum ParameterLocation {
  path,
  query,
  header
}

export class Contract {
  id: string;
  name: string;
  content: string;
  type: ContractType;
  serviceId: string;
}
export enum ContractType {
  WSDL,
  XSD,
  JSON_SCHEMA,
  SWAGGER,
  RAML,
  OPEN_API_SPEC
}

export class Header {
  name: string;
  values: string[];
}

export class Parameter {
  name: string;
  value: string;
}

abstract class Message {
  name: string;
  content: string;
  operationId: string;
  testCaseId: string;
  headers: Header[];
}
export class Request extends Message {
  id: string;
  responseId: string;
  queryParameters: Parameter[];
}
export class Response extends Message {
  id: string;
  status: string;
  mediaType: string;
  dispatchCriteria: string;
  isFault: boolean = false;
}

export class RequestResponsePair {
  request: Request;
  response: Response;
}

export class ServiceView {
  service: Service;
  messagesMap: {string : RequestResponsePair[]};
}

export class GenericResource {
  id: string;
  serviceId: string;
  payload: any;
}