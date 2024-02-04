

![logo-color.svg](public%2Flogo-color.svg)
# Visit Tracker

This is a tool for having a shared map for visiting a large number of people. Our congregation has a lot of people who are on our records, but we don't know if they're still in the area or not. This tool allows us to have a map that we can all see and update, so we can see who is still in the area and who isn't. It uses a Google Sheet as a backend, so it's easy to update and share.


## Setup
This is a react SPA with no backend. It can be run in any environment, but requires the following environment variable to connect to a sheet in Google Drive: 

| Variable                | Description                                                                                                                                                                                                                                   |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `VITE_GOOGLE_CLIENT_ID` | A client ID of a Google application with access to Google Sheets and Google Drive. To set this up, follow the instructions in the [Google Developer Portal](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid) |
| `VITE_RADAR_API_KEY`    | An API key for [Radar](https://radar.com/). This is used geocoding. Radar offers a generous free tier of 100,000 monthly API calls at no cost, which should be more than enough for any individual ward.                                      |