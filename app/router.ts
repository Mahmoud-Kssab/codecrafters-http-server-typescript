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
    // "/users/{id}/{name}/{age}": (request: Req) => {
    //   console.log("--------------------------------");
    //   return { statusCode: 200, body: "JSON.stringify(parameters)" };
    // },
  },
};
