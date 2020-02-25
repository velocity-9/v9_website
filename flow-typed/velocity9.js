declare type ComponentId = {
  github_username: string,
  github_repo: string
};

declare type ComponentDashboardEntry = {
  deploymentIntention: string,
  receivedTime: string,
  color: string,
  isDeploying: boolean,
  deploymentReason: string
};

declare type ComponentStatEntry = {
  avg_ms_latency: number,
  avg_response_bytes: number,
  color: string,
  github_repo: string,
  hits: number,
  received_time: string,
  stat_window_seconds: number,
  worker_name: string
};

declare type ComponentLogEntry = {
  github_repo: string,
  execution_num: number,
  log_text: string,
  log_error: string,
};

declare type AppConfig = {
  port: number
};

declare type PageProps = {
  username: ?string,
  isAuthenticated: boolean
};
