declare type DeployedComponentEntry = {
  username: string,
  componentName: string,
  deploymentIntention: string,
  color: string,
  isDeploying: boolean,
  isRunning: boolean
};

declare type DashboardComponents = {
  components: Array<DeployedComponentEntry>,
  notComponents: Array<string>
};

declare type ComponentStatEntry = {
  worker_name: string,
  github_repo: string,

  hits: number,
  color: string,

  avg_ms_latency: number,
  avg_response_bytes: number,

  received_time: string,
  stat_window_seconds: number,
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
  username: ?string
};
