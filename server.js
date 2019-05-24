require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const mediaRoute = require('./routes/media');
const app = express();
app.use(fileUpload());

//Note, for this project am using a mongoDB instance from Mlab
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('database connected'))
	.catch((err) => console.log('Error connecting to db'));

//configure cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

app.use('/media', mediaRoute);
app.get('*', (req, res) => res.json({ status: 200, mssg: 'working' }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

module.exports = app;

//clipped
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport"
//           content="width=device-width, initial-scale=1.0" />
//     <meta http-equiv="X-UA-Compatible" content="ie=edge" />

//     <title>Mini App</title>

//     <style>

//       div.user-photo {
//         margin: 1em auto;
//         width: 150px;
//         height: 150px;
//         border-radius: 50%;

//       }

//       body{
//         background: white;
//       }

//       div.select{
//         margin-bottom: 2.5rem;
//       }

//     </style>
//   </head>
//   <body>
//     <button  class="mdc-icon-button material-icons" id="filter-query">filter_list</button>
//     <div class="select">
//       <select class="select-text">
//         <option disabled selected>Select User</option>
//       </select>
//     </div>
//     <div class="user-photo">
//       <img src="https://via.placeholder.com/150" alt="profile-img"/>
//     </div>
//      <div class="details mdc-elevation--z3">
//        <p><span data-age="Age" class="prop"></span> <span class="value" data-age-value></span></p>
//        <p><span data-height="Height" class="prop"></span> <span class="value" data-height-value></span></p>
//        <p><span data-weight="Weight" class="prop"></span> <span class="value" data-weight-value></span></p>
//        <p><span data-gender="Gender" class="prop"></span> <span class="value" data-gender-value></span></p>
//        <p><span data-country="Country" class="prop"></span> <span class="value" data-country-value></span></p>
//     </div>
//     <button id="oracle" class="mdc-button" >Calculate BMI</button>
//        <div id="outcome">
//          <h3 class="mdc-typography--headline5">BM1</h3>
//            <p></p>
//        </div>
//     <script>

//       const fetchAndDisplayUsers = () => {
//         users.push({
//           age: 40,
//           weight: 75,
//           height: 6,
//           country: 'Nigeria',
//           name: 'Charles Odili',
//           id: 'dfhb454768DghtF'
//         });

//         displayUsers(users);
//       };

//       const startApp = () => {

//       };

//       startApp();

//     </script>
//   </body>
// </html>

// // Get states
// const getStates = async () => {
//  const res = await fetch('../data/states.json');
//  states = await res.json();
// };

// // FIlter states
// const searchStates = searchText => {
//  // Get matches to current text input
//  let matches = states.filter(state => {
//   const regex = new RegExp(`^${searchText}`, 'gi');
//   return state.name.match(regex) || state.abbr.match(regex);
//  });

//  // Clear when input or matches are empty
//  if (searchText.length === 0) {
//   matches = [];
//   matchList.innerHTML = '';
//  }

//  outputHtml(matches);
// };

// // Show results in HTML
// const outputHtml = matches => {
//  if (matches.length > 0) {
//   const html = matches
//    .map(
//     match => `<div class="card card-body mb-1">
//     <h4>${match.name} (${match.abbr})
//     <span class="text-primary">${match.capital}</span></h4>
//     <small>Lat: ${match.lat} / Long: ${match.long}</small>
//    </div>`
//    )
//    .join('');
//   matchList.innerHTML = html;
//  }
// };

// window.addEventListener('DOMContentLoaded', getStates);
// search.addEventListener('input', () => searchStates(search.value));
