const isGASEnvironment = (): boolean => {
  return (
    typeof google !== "undefined" &&
    Boolean(google?.script?.url) &&
    Boolean(google?.script?.history)
  );
};

export { isGASEnvironment };
