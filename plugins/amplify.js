import Vue from "vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";

import awsconfig from "~/aws-exports";

Amplify.Logger.LOG_LEVEL = "DEBUG";
Amplify.configure({ ...awsconfig, ssr: true });
AmplifyModules.Auth.configure({ ...awsconfig, ssr: true });

Vue.use(AmplifyPlugin, AmplifyModules);
