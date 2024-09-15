import { Req } from "./request/request";

export const router: any = {
  GET: {
    "/echo/{str}": (parameters: any) => {
      return {
        statusCode: 200,
        statusText: "OK",
        headers: [
          "Content-Type: text/plain",
          `Content-Length: ${Object.values(parameters).join("").length}`,
        ],
        body: parameters,
      };
    },
    "/": (parameters: any) => {
      return {
        statusCode: 200,
        statusText: "OK",
        headers: [],
        body: parameters,
      };
    },
    "/user-agent": (parameters: any, request: Req) => {
      return {
        statusCode: 200,
        statusText: "OK",
        headers: [
          "Content-Type: text/plain",
          `Content-Length: ${request.header("User-Agent").length}`,
        ],
        body: { str: request.header("User-Agent") },
      };
    },
  },
};
