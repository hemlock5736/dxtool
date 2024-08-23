import { GoogleScript } from "../types/google-script";
import { promisify } from "../utils/promisify";
import { GoogleScriptHost } from "./GoogleScriptHost";

class GSPromises extends GoogleScriptHost {
  constructor() {
    super();
    this._googleScript = this.getGoogleScript();
  }

  private getGoogleScript(): GoogleScript {
    return {
      history: {
        push: promisify(google.script.history.push),
        replace: promisify(google.script.history.replace),
        setChangeHandler: promisify(google.script.history.setChangeHandler),
      },
      url: {
        getLocation: promisify(google.script.url.getLocation),
      },
    };
  }
}

export { GSPromises };
