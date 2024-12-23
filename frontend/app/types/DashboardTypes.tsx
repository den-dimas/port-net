export interface detectedProtocolsParams {
  protocols: Array<{
    name: string;
    packets: number;
    bytes: number;
    flows: number;
  }>;
}

export interface ndpiParams {
  ndpis: Array<{
    name: string;
    size: number;
    unit: string;
  }>;
}

export interface protocolStatsParams {
  statistics: Array<{
    name: string;
    packets: number;
    bytes: number;
    flows: number;
  }>;
}

export interface trafficStatsParams {
  traffics: Array<{
    name: string;
    size: number;
    other: string;
  }>;
}

export interface riskStatsParams {
  risks: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
}

export type DashboardComponentParams = {
  protocols: detectedProtocolsParams;
  statistics: protocolStatsParams;
  ndpis: ndpiParams;
  risks: riskStatsParams;
  traffics: trafficStatsParams;
};
