
# Three-Tier Django Notes App

  

The Three-Tier Django Notes App is a full-stack web application built using **Django, Django REST Framework**, and **HTML, CSS, JS(Frontend)** with **MySql** as the database. It follows a three-tier architecture with a frontend, backend, and database layer. The application allows users to create, read, update, and delete notes (todos) through a RESTful API and uses **Nginx** to serve Frontend and act as Reverse Proxy for 2 instances of the Backend.

  

## Features

  

- Create, read, update, and delete notes.

- Real-time updates to the notes list.

- **RESTful API** for managing notes.

- Frontend built with **HTML, CSS, JS**.

- Backend built with **Django** and **Django REST Framework**.

- **MySql** used as database.

- **Nginx** serves static files and proxies API requests to the Django backend.

- **Multi-stage Docker** build for lightweight images.

- One step build with **Docker Compose**.

  

## Architecture

  

-  **Frontend**: HTML, CSS, Js application that interacts with the Django backend API.

-  **Backend**: Django application with Django REST Framework to handle API requests.

-  **Database**: Mysql for stroring data.

-  **Web Server**: Nginx to serve static files and proxy API requests.

  

## Requirements

  

- Docker

- Docker Compose

  

## Setup Instructions

  

### 1. Clone the Repository

  

```bash
	git  clone https://github.com/Arijit9721/Three-Tier-Django-Notes-App.git
```
-  Navigate to the folder
```bash
	cd  three-tier-django-notes-app
```
  

### 2.Setup the Enviroment variables in a .env file

  

#### a. Create  a  .env  file  to  store  the  enviromental  variables

  

```bash
	touch .env
```
  

#### b.  Now open the .env file and add the variables

  

```bash

DB_NAME=

DB_USER=

DB_PASSWORD=

DB_PORT=

DB_HOST=

MYSQL_ROOT_PASSWORD=

MYSQL_DATABASE=

MYSQL_USER=

MYSQL_PASSWORD=
```
  
  

### 3. Build and Run the containers using Docker Compose
```bash
	docker-compose up --build  -d
```
## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
