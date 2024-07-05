# ERD: FoodieSocial

This document explores the design of FoodieSocial, a social experience for sharing and discovering food recipes.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.

## Storage

We'll use a relational database (schema follows) for fast retrieval of recipes and comments. A minimal database implementation such as SQLite suffices, although we can potentially switch to something with a little more power such as PostgreSQL if necessary. Data will be stored on the server on a separate, backed-up volume for resilience. There will be no replication or sharding of data at this early stage.

We ruled out storage-as-a-service services such as Firestore and the like in order to showcase building a standalone backend for educational purposes.

### Schema:

We'll need at least the following entities to implement the service:

Users:
| Column | Type |
|--------|------|
| ID | STRING/UUID |
| First/Last name | STRING |
| Password | STRING |
| Email | STRING |
| Username | STRING |

Recipes:
| Column | Type |
|--------|------|
| ID | STRING/UUID |
| Title | STRING |
| Ingredients | TEXT |
| Instructions | TEXT |
| UserId | STRING/UUID |
| PostedAt | Timestamp |

Favorites:
| Column | Type |
|--------|------|
| UserId | STRING/UUID |
| RecipeId | STRING/UUID |

Likes:
| Column | Type |
|--------|------|
| UserId | STRING/UUID |
| RecipeId | STRING/UUID |

Dislikes:
| Column | Type |
|--------|------|
| UserId | STRING/UUID |
| RecipeId | STRING/UUID |

Comments:
| Column | Type |
|--------|------|
| ID | STRING |
| UserId | STRING/UUID |
| RecipeId | STRING/UUID |
| Comment | TEXT |
| PostedAt | Timestamp |

## Server

A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server for speed of development.
- Express.js is the web server framework.
- Sequelize to be used as an ORM.

### Auth

For v1, a simple JWT-based auth mechanism is to be used, with passwords encrypted and stored in the database. OAuth can be added later for Google, Facebook, and other providers.

### API

Auth:
- /signIn  [POST]
- /signUp  [POST]
- /signOut [POST]

Recipes:
- /recipes/list [GET]
- /recipes/new  [POST]
- /recipes/:id  [GET]
- /recipes/:id  [DELETE]

Favorites:
- /favorites/new [POST]

Likes:
- /likes/new [POST]

Dislikes:
- /dislikes/new [POST]

Comments:
- /comments/new  [POST]
- /comments/list [GET]
- /comments/:id  [DELETE]

## Clients

We'll start with both a web client and a mobile client. The web client will be implemented in React.js, and the mobile client will be implemented in Flutter.

The web client will be hosted using any free web hosting platform such as Firebase or Netlify. A domain will be purchased for the site and configured to point to the web host's server public IP.

The mobile app will be available on the Google Play Store and the Apple App Store.

## Hosting

The code will be hosted on GitHub, with pull requests and issues welcome.

The web client will be hosted using any free web hosting platform such as Firebase or Netlify. A domain will be purchased for the site and configured to point to the web host's server public IP.

The server will be deployed to a (likely shared) VPS for flexibility. The VM will have HTTP/HTTPS ports open, and we'll start with a manual deployment, to be automated later using GitHub Actions or similar. The server will have a closed CORS policy except for the domain name and the web host server.

---

This document outlines the essential components and setup for FoodieSocial, providing a clear roadmap for the backend and frontend development of the project.