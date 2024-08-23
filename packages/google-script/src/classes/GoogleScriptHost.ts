import { GoogleScript } from "../types/google-script";

abstract class GoogleScriptHost {
  protected _googleScript: GoogleScript = {} as GoogleScript;

  get googleScript(): GoogleScript {
    return this._googleScript;
  }
}

export { GoogleScriptHost };
