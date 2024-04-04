export type UserDataTypes = {
  first_name: string;
  last_name: string;
  role: string;
  username?: string;
  level?: {
    level: string;
    exp: string;
    expNeeded: string;
  };
};
