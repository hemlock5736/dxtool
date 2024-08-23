type AllowedDevelopmentDomains = string | ((origin: string) => boolean);

interface ServerConfig {
  allowedDevelopmentDomains: AllowedDevelopmentDomains;
}

export type { AllowedDevelopmentDomains, ServerConfig };
