type GSStore = Record<
  string,
  {
    resolve: (value?: unknown) => void;
    callback?: (value?: unknown) => void;
  }
>;

interface GasFunctionData {
  id: string;
  type: "REQUEST_GS" | "RESPONSE_GS";
}

interface DevServerRequest extends GasFunctionData {
  args: unknown[];
  functionName: [string, string];
  type: "REQUEST_GS";
}

interface DevServerResponse extends GasFunctionData {
  response: unknown;
  type: "RESPONSE_GS";
}

interface DevServerContentWindow<Origin extends "GAS" | "App"> extends Window {
  postMessage: {
    (
      message: Origin extends "GAS" ? DevServerResponse : DevServerRequest,
      targetOrigin: string,
      transfer?: Transferable[],
    ): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (message: any, options?: WindowPostMessageOptions): void;
  };
}

interface AppWindow extends Window {
  parent: DevServerContentWindow<"App">;
  gsStore: GSStore;
}

interface DevServerRequestEvent extends MessageEvent {
  data: DevServerRequest;
}

interface GASDevServerIFrame extends HTMLIFrameElement {
  contentWindow: DevServerContentWindow<"GAS">;
}

export type { AppWindow, DevServerRequestEvent, GASDevServerIFrame };
