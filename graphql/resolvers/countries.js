const { UserInputError } = require("apollo-server");

const User = require("../../models/user");

const {
  countriesData,
  countryRef,
  countriesRefCrud,
} = require("../../utils/firebase");

const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getCountries: async () => {
      try {
        const data = await countriesData();
        return data;
      } catch (err) {
        throw new Error(err);
      }
    },
    getCountry: async (_, { id }) => {
      const data = await countryRef(id);
      return data;
    },
  },
  Mutation: {
    createCountry: (
      _,
      { countryInput: { name, capital, continent, imgUrl } }
    ) => {
      const country = {
        name,
        capital,
        continent: continent.toUpperCase(),
        imgUrl,
      };
      countriesRefCrud.add({
        ...country,
      });
      const newData = countriesData();

      return newData;
    },
    updateCountry: (_, { id, imgUrl }) => {
      countriesRefCrud
        .doc(id)
        .update({ imgUrl })
        .then(() => countriesData());

      const newData = countriesData();

      return newData;
    },
    deleteCountry: (_, { id }) => {
      countriesRefCrud
        .doc(id)
        .delete()
        .then(() => countriesData());

      const newData = countriesData();

      return newData;
    },
    addCountry: async (_, { userId, countryId }, context) => {
      const user = checkAuth(context);
      const data = await countryRef(countryId);

      if (user) {
        traveler = await User.findById(user.id);
        if (userId === traveler.id) {
          traveler.visited.push({
            ...data,
          });

          await traveler.save();
          return traveler;
        } else {
          throw new UserInputError("Action not allowed");
        }
      } else {
        throw new UserInputError("User not found");
      }
    },
  },
};
