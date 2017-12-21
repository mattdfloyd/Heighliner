
import get from "lodash/get";

export default {
  Query: {
    currentUser(_, args, { user, person }) {
      if (!user || !person) return null;
      return { user, person };
    },
  },

  UserTokens: {
    tokens: ({ loginTokens }) => loginTokens,
  },

  UserRock: {
    id: ({ PersonId }) => PersonId,
    alias: ({ PrimaryAliasId }) => PrimaryAliasId,
  },

  UserService: {
    rock: ({ rock }) => rock,
    resume: ({ resume }) => resume,
  },

  User: {
    id: ({ user, person } = {}) => {
      const mongoId = get(user, "_id"); // Deprecated
      const rockId = get(person, "PrimaryAliasId");
      return rockId || mongoId;
    },
    createdAt: ({ user } = {}) => {
      const {
        createdAt, // Deprecated Mongo User
        CreatedDateTime, // Rock User
      } = user;
      return CreatedDateTime || createdAt;
    },
    services: (props = {}) => get(props, "user.services"), // Deprecated
    emails: (props = {}) => get(props, "user.emails"), // Deprecated
    email: async ({ user, person }) => {
      const email = get(user, "emails.0.address");
      if (email) return email; // Deprecated Mongo User

      // Rock Profile
      return person.Email;
    },
  },

  Mutation: {
    loginUser(_, props, { models }) {
      return models.User.loginUser(props);
    },
    registerUser(_, props, { models }) {
      return models.User.registerUser(props);
    },
    logoutUser(_, props, { models, authToken, user }) {
      return models.User.logoutUser({
        token: authToken,
        loginId: user && user.Id,
      });
    },
    forgotUserPassword(_, props, { models }) {
      const {
        email,
        sourceURL,
      } = props;
      return models.User.forgotPassword(email, sourceURL);
    },
    resetUserPassword(_, props, { models }) {
      const {
        token,
        newPassword,
      } = props;
      return models.User.resetPassword(token, newPassword);
    },
    changeUserPassword(_, props, { models, user }) {
      const {
        oldPassword,
        newPassword,
      } = props;
      return models.User.changePassword(user, oldPassword, newPassword);
    },
  },
};
