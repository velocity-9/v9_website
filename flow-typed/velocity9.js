declare type ComponentId = {
  github_username: string,
  github_repo: string
};

declare type ComponentStatEntry = {
  github_repo: string,
  received_time: string,
  color: string,
  stat_window_seconds: number,
  hits: number,
  avg_response_bytes: number,
  avg_ms_latency: number,
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
