# devtinder api

## appRouter
POST/signup
POST/login
POST/logout

## profileRouter
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

## connectionRequestRouter




POST/request/send/:status:userId

POST/request/review/:status/:userId

<!-- POST/request/review/accepted/requestId -->
<!-- POST/request/review/rejected/requestId -->


## userRouter
GET/user/requests/recieved
GET/user/connections
GET/user/feed


Status:ignore ,interested ,accepeted ,reject