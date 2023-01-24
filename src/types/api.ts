export type Metadata = any;

export type ApiResponse<T> = {
  data: T;
  metadata: Metadata;
}