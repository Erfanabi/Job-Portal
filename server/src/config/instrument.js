// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://95ffaa0d10fd7b1d85d516591c223add@o4509729841283073.ingest.us.sentry.io/4509729843773440",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  integrations: [nodeProfilingIntegration(), Sentry.mongooseIntegration()],
});
