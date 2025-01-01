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


/feed?page=3&limit=10 => 21-30 .skip(20)  .limit(10)


skip=(page-1)*limit  <== formula

Status:ignore ,interested ,accepeted ,reject