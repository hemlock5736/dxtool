import { useRef } from "react";
import { GSClient } from "@google-apps-script/google-script";
import { GoogleScript } from "@google-apps-script/google-script/dist/types/google-script";

export const useGoogleScript = (urlPattern: RegExp) => {
  const googleScriptRef = useRef<GoogleScript>();

  if (googleScriptRef.current === undefined) {
    const { googleScript } = new GSClient({
      allowedDevelopmentDomains: (origin) => urlPattern.test(origin),
    });
    googleScriptRef.current = googleScript;
  }

  return googleScriptRef;
};
