export type ICache = {
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<any>;
  delete: (key: string) => Promise<any>;
  hget: (key: string, field: string) => Promise<any>;
  hdel: (key: string, field: string) => Promise<any>;
  hset: (key: string, field: string, value: any) => Promise<any>
};
