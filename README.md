
## About the project

This project was made for the Siemens Java Developer Internship technical assessment.
We had to implement a web application for hotel reservation management.
I made this project using Java Spring on back-end and React, TailwindCss and React Boostrap on frontend.

## Project Description

To run this project:

### Frontend:

clone this repo, open terminal and use => cd frontend, cd hotel-reservation, npm install, npm run dev in this order. 

### Backend:

clone this repo, open terminal =>
> cd hotel-reservation-app

Compile the Java files
> javac -d bin src/grnraoul/hotelreservationapp/*.java

Run the main class
> java -cp bin grnraoul.hotelreservationapp.Main

- > Alternatively, you can JUST PRESS BUILD AND RUN FROM IntelliJ IDEA or use a similar function from other IDE.

## Demo pics and details
I will describe the tasks and offer a photo for each of them.

### the users specifies a radius in kilometers to find all the nearby hotels and the application lists and display all the hotels found

![proj4](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/691fe597-0e29-4187-a399-65840a068dcc)
![proj6](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/e6268cd9-21c3-4e48-9755-cab1eb19a85d)
![proj5](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/b8eacb18-4f68-4427-ae1f-95ffbe0d8df7)

### UserReservation Page and UserFeedback Page where users can see, change or delete their reservations or their feedback

![proj11](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/9bdb91c8-a52f-47e6-b26d-9e01273e8184)

### the user can select a specific hotel and see all available rooms alongside their prices, can book a room and can also leave a feedback

![proj7](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/8844646f-3044-44d2-92e6-ac0ffeb040fc)
![proj8](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/a39c2737-4d65-4871-8e1f-228767b08b4a)
![proj9](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/57c72be8-e30d-4615-b891-48218b2e9063)
![proj10](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/07495e93-92ba-4aa2-ac1f-7fae7a22d03f)


### the application allows the user to cancel their reservation or change the booked room at least two hours before the check-in

![proj12](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/5804fa32-dce2-4ba1-bed4-1f2146dcf41a)
![proj13](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/b854f1a6-0c03-478c-9ddf-74edc174779b)
![proj14](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/11f085db-db11-4bc4-a2ce-d678c4f32280)
![proj17](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/9bc7d7f8-e06d-4b49-a1c3-da985fe7714d)

### the application has stored all hotels with their coordinates, rooms, and the price for each room in a database. The data is read from a given json file.

![proj22](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/30aff401-3424-47af-9b06-121ef76b86a2)
![proj21](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/e8f29205-c999-4b1a-9967-b601b12c5ac4)


## Extra Features

### Spring security implementation (role based/user, password, jwtToken)

![proj1](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/94315545-9cc6-4e89-820d-3784c900c156)
![proj2](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/52f20514-a4bf-4c64-b19c-2cfd68de60ed)
![proj3](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/73ec00a1-987b-4398-b6fe-5406e12f5336)

### Admin Page - the admin can delete users or click on them and see a modal with their reservations and comments

![proj20](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/65df8dd3-e233-4dca-9d72-fdefd2380136)
![proj19](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/ef15445c-afa2-4f62-965a-5b55fa6b6dcb)
![proj18](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/5bf87cff-c8e6-4e0a-a817-997e871e44db)


### Bonus information:

Even though my application lacks unit tests. I tested all of the endpoints with Postman

![proj24](https://github.com/RaoulGrn/hotel-reservation-app/assets/108396853/16082148-b7fc-4040-b9de-f6203c9bf2b3)










