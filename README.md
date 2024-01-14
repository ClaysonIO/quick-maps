# Quick Maps

This is a tool for having a shared map for visiting a large number of people. Our congregation has a lot of people who are on our records, but we don't know if they're still in the area or not. This tool allows us to have a map that we can all see and update, so we can see who is still in the area and who isn't. It uses Netlify authentication to control who has access to the map, and limits the information stored in the database to names and addresses.


## Setup
This is a Netlify application, and uses netlify functions. It requires the following environment variables to be set in order to store the data in MongoDB Atlas using the Data API: 

| Variable | Description                              |
| -------- |------------------------------------------|
| `MONGO_DATABASE` | The name of the Mongo Database           |
| `MONGO_DATA_SOURCE` | The Data Source value from MongoDB Atlas |
| `MONGO_DATA_API_APP_ID` | The Data API App ID from MongoDB Atlas   |
| `MONGO_API_KEY` | The API Key for MongoDB Atlas           |

## Attributions


Favicon: 

[Location icons created by IconMarketPK - Flaticon](https://www.flaticon.com/free-icons/location)