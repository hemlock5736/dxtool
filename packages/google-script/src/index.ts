import { GoogleScriptHost } from "./classes/GoogleScriptHost";
import { GSPromises } from "./classes/GSPromises";
import { ServerProxy } from "./classes/ServerProxy";
import { ServerConfig } from "./types/config";
import { GoogleScript } from "./types/google-script";
import { isGASEnvironment } from "./utils/isGASEnvironment";

class GSClient {
  private _googleScriptHost: GoogleScriptHost | undefined;

  constructor(private _config?: ServerConfig) {
    if (isGASEnvironment()) {
      this._googleScriptHost = new GSPromises();
    } else {
      this._googleScriptHost = new ServerProxy(this._config);
    }
  }

  get googleScript(): GoogleScript {
    return this._googleScriptHost?.googleScript as GoogleScript;
  }
}

export { GSClient };
