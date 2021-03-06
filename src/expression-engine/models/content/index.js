import { gql } from "../../../util";
import schema from "./schema";
import resolvers from "./resolver";
import models from "./model";
import tables from "./tables";
import queries from "./queries";

export default {
  tables,
  schema,
  resolvers,
  models,
  queries,
};
