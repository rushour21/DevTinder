# DevTinder APIs

## authRouter
- POST /signup
- post /loging
- post /logout

## profileRouter
- get /profile
- patch /profile/edit
- patch /profile/password

## connectionRequestRouter
- post /request/interested/:userId
- post /request/ignore/:userId
- post /request/review/accepted/:requestId
- post /request/review/rejected/:requestId

## userRouter
- Get /user/connections
- Get /user/requests
- get /user/feed

status - ignore, interested, accepted, rejected
