
import { connect } from "./mongo";
import Users from "./models/users";

import { createApplication } from "../util/heighliner";

export const { schema, resolvers, models, queries, mutations } = createApplication([
  Users,
]);

export default {
  models,
  resolvers,
  schema,
  connect,
  mutations,
};
