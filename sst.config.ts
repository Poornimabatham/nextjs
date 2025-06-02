import { SSTConfig } from "sst";

export default {
  config(_input) {
    return {
      name: "nextjs-sst-app",
      region: "us-east-1",
    };
  },
  async stacks(app) {
    const { Api, NextjsSite } = await import("sst/constructs");

    const api = new Api(app, "Api", {
      routes: {
        "GET /hello": "functions/hello.handler",
        "POST /submit": "functions/submit.handler",
      },
    });

    new NextjsSite(app, "NextjsSite", {
      path: "nextjs-app",
      environment: {
        NEXT_PUBLIC_API_URL: api.url,
      },
    });

    app.stack(api.stack);
  },
} satisfies SSTConfig;
