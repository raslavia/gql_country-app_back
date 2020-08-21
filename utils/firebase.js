const { FIREBASE_KEY, FIREBASE_APP_ID } = require("../config");

const firebase = require("@firebase/app").default;
require("@firebase/firestore");

const config = {
  apiKey: FIREBASE_KEY,
  authDomain: "data-gql.firebaseapp.com",
  databaseURL: "https://data-gql.firebaseio.com",
  projectId: "data-gql",
  storageBucket: "data-gql.appspot.com",
  messagingSenderId: "196709806689",
  appId: FIREBASE_APP_ID,
};

firebase.initializeApp(config);

const database = firebase.firestore();

const countriesRef = database.collection("countries").orderBy("name").limit(10);
const countriesRefCrud = database.collection("countries");
const countryRef = id =>
  database
    .collection("countries")
    .doc(id)
    .get()
    .then(doc => {
      const { name, capital, continent, imgUrl } = doc.data();
      return {
        id: doc.id,
        name,
        capital,
        continent,
        imgUrl,
      };
    });

const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { name, capital, continent, imgUrl } = doc.data();
    return {
      id: doc.id,
      name,
      capital,
      continent,
      imgUrl,
    };
  });
  return transformedCollection;
};

const countriesData = () => {
  const arr = countriesRef
    .get()
    .then(snapshot => {
      const countriesArr = convertCollectionsSnapshotToMap(snapshot);
      return countriesArr;
    })
    .catch(error => console.log(error.message));
  return arr;
};

// const addCountryFirebase = country => {
//   countriesRefCrud
//     .add({
//       ...country,
//     })
//     .then(() => countriesData());
// };
// const removeCountry = id => {
//   countriesRefCrud
//     .doc(id)
//     .delete()
//     .then(() => countriesData());
// };

// const updateCountry = (id, value) => {
//   countriesRefCrud
//     .doc(id)
//     .update({ imgUrl: value })
//     .then(() => countriesData());
// };

module.exports = {
  countriesData,
  countryRef,
  countriesRefCrud,
};
