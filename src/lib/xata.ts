// Generated by Xata Codegen 0.29.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "User",
    columns: [
      { name: "fid", type: "string", unique: true },
      { name: "step", type: "string", notNull: true, defaultValue: "F_MATCH" },
      { name: "fdisplayName", type: "string", defaultValue: "" },
      { name: "fname", type: "string" },
      { name: "fbio", type: "text" },
      { name: "fpicture", type: "string" },
      { name: "xid", type: "string" },
      { name: "xname", type: "string" },
      { name: "xdisplayName", type: "string" },
      { name: "xbio", type: "text" },
      { name: "xpicture", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type User = InferredTypes["User"];
export type UserRecord = User & XataRecord;

export type DatabaseSchema = {
  User: UserRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://MatchX-s-workspace-c27c8j.us-east-1.xata.sh/db/matchx-db0",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
