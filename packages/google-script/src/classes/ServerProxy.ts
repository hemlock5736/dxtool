import { ServerConfig } from "../types/config";
import { AppWindow } from "../types/dev-server";
import { GoogleScript } from "../types/google-script";
import { checkAllowList } from "../utils/checkAllowList";
import { proxyfy } from "../utils/proxyfy";
import { GoogleScriptHost } from "./GoogleScriptHost";

declare const window: AppWindow;

class ServerProxy extends GoogleScriptHost {
  constructor(private _config?: ServerConfig) {
    super();
    if (typeof window.gsStore === "undefined") {
      window.gsStore = {};
      window.addEventListener("message", this.buildMessageListener(), false);
    }
    this._googleScript = this.getGoogleScript();
  }

  private buildMessageListener(): (event: MessageEvent) => void {
    return (event: MessageEvent) => {
      const allowOrigin = checkAllowList(
        event.origin,
        this._config?.allowedDevelopmentDomains,
      );
      if (!allowOrigin || event.data.type !== "RESPONSE_GS") {
        return;
      }

      const { response, id } = event.data;
      const { resolve, callback } = window.gsStore[id];

      if (typeof callback !== "undefined") {
        callback(response);
      }
      resolve();
    };
  }

  private getGoogleScript(): GoogleScript {
    return {
      history: {
        push: proxyfy<typeof google.script.history.push>(["history", "push"]),
        replace: proxyfy<typeof google.script.history.replace>([
          "history",
          "replace",
        ]),
        setChangeHandler: proxyfy<
          typeof google.script.history.setChangeHandler
        >(["history", "setChangeHandler"], true),
      },
      url: {
        getLocation: proxyfy<typeof google.script.url.getLocation>(
          ["url", "getLocation"],
          true,
        ),
      },
    };
  }
}

export { ServerProxy };
