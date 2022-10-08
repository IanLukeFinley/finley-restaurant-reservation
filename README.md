# Capstone: Restaurant Reservation System

A demonstration of a full stack project, creating a reservation system for a restaurant.  Included are an original React client, an Express server, and a postgreSQL database.  Tools used include: Javascript, HTML/CSS, Bootstrap, React, Node.js, RESTful API, Knex, Express, postgreSQL.

## Functions

###  Create and list reservations
The ‘reservations/new’ pages includes a form for first and last name, phone number, date and time of reservation and number in party. When submitted, these reservations will be listed on the dashboard page for that date.

### Create reservation only on future, non-Tuesday dates
Reservations are only allowed for future dates, and never on a Tuesday (as our test restaurant is closed on Tuesdays).

### Create reservation within eligible timeframe
Reservations are only allowed during business hours(10:30 AM to 9:30 PM), and only up to 60 minutes before closing.

### Seat reservation
The ‘tables/new” page can be used to create the tables in the restaurant, accepting table name and capacity. The dashboard page includes both the list of reservations for that date, as well as a list of created tables.  A “Seat” button on each reservation allows that reservation to be seated at a specific table, changing its status from Free to Occupied.

### Finish an occupied table
On each occupied table, there is a “Finish” button that clears that reservation and restores to table to Free.

### Reservation Status
The dashboard page includes the status of the reservation: Booked (default on creation), Seated (see Seat reservation), or Finished (see Finish an occupied table).

### Search for a reservation by phone number
The `/search` page will display a search box with a find button that will query the database to display all reservations matching the phone number, regardless of status.

### 8 Change an existing reservation

The `/dashboard` and the `/search` page have an “Edit” button that navigates to `/reservations/:reservation_id/edit`.  There, reservations can be cancelled or or changed via a form.

## Live at:

Deployed via Heroku at: https://finley-restaurant-frontend.herokuapp.com/dashboard
