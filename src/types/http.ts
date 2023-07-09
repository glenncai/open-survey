export type HttpResDataType = {
  [key: string]: any;
};

export type HttpResType<T = HttpResDataType> = {
  errno: number;
  data?: T;
  msg?: string;
};
