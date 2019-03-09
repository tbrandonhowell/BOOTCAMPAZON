# BOOTCAMPAZON


## Project Overview

BOOTCAMPAZON was created as a homework assignment for the UNC Chapel Hill Full Stack Web Development Bootcamp, Nov. 2018 Cohort. BOOTCAMPAZON is ran from terminal.

// TODO: update this:
You can watch a video of BOOTCAMPAZON in action here: [Link] (https://drive.google.com/file/d/19hlAufCrm2TLe1ddyGa2lF0z4f29coMP/view?usp=sharing)


## Technologies / Proficiencies

Skills/technologies incorporated into this assignment:
* Javascript
* Node.js
* MySQL
* Node Package Manager
* Mad ASCI Layout Skills

Node packages incorporated into this assignment:
* [MySQL] (https://www.npmjs.com/package/mysql)
* [Inquirer] (https://www.npmjs.com/package/inquirer)
* [Table] (https://www.npmjs.com/package/table)
* [Chalk] (https://www.npmjs.com/package/chalk)


## Features

BOOTCAMPAZON is a simple pseudo-ecommerce storefront ran from the command line. There is a "Customer" and "Manager" portal.

// TODO: STOPPED HERE.
### concert-this

The concert-this function of LIRI Bot will take the input of a band name, and query the band name against the Bands In Town API. If the band will be performing in the near future, information for those events will be printed to the screen. 

Input format:
`node liri concert-this <band name>`

Example:
`node liri concert-this queens of the stone age`

![Image of concert-this](https://raw.githubusercontent.com/tbrandonhowell/liri-node-app/master/images/concert-this.png)
      

### spotify-this-song

The spotify-this-song function of LIRI Bot will take the input of a song name, and query the song name against the Spotify API. If there are matches for the song name, information about the first match in the API's returned JSON object will be printed to the screen.

Input format:
`node liri spotify-this-song <song name>`

Example:
`node liri spotify-this-song paranoid android`

![Image of concert-this](https://raw.githubusercontent.com/tbrandonhowell/liri-node-app/master/images/spotify-this-song.png)


### movie-this

The movie-this function of LIRI Bot will take the input of a movie name, and query the movie name against the OMDB API. If there is a match for the movie name, information about that movie will be printed to the screen.

Input format:
`node liri movie-this <movie name>`

Example:
`node liri movie-this death to smoochy`

![Image of concert-this](https://raw.githubusercontent.com/tbrandonhowell/liri-node-app/master/images/movie-this.png)


### do-what-it-says

The do-what-it-says function is an additional way to trigger the movie-this, spotify-this-song, or concert-this function based on the contents of random.txt. Within random.txt, you can include a single function type and a search string in the following format:

`spotify-this-song,"stairway to heaven"`

To trigger this function, type the following in console:

`node liri do-what-it-says`

![Image of concert-this](https://raw.githubusercontent.com/tbrandonhowell/liri-node-app/master/images/do-what-it-says.png)


## LIRI Bot Setup

LIRI Bot requires node.js in order to run. Package.json is included for ease of installation for NPM packages. 

LIRI Bot uses the file `.env` that is not included in this repository, and should be placed in the same folder with liri.js. This file should contain your Spotify Client ID and Client Secret. 

.env should be formatted as such:

    SPOTIFY_ID=123456789123456789123456789
    SPOTIFY_SECRET=123456789123456789123456789


