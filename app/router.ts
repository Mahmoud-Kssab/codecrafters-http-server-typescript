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
  },
};
