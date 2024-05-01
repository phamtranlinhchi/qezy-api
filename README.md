#### Dev Note
1. Use *throw new ApiError(code, message)* to send back error
2. Use *catchAsync* to wrap the controller to catch all error (Don't need to use try catch). We have handled it in error middleware.
3. Use *logger* from helper to log (this will colorize your log and it looks better:])
4. Do not use number for status code when respond. Please use declared variables (e.g *HttpStatusCode.Ok*)
5. Please add new environment variables in *src/config/vars* then use from this file, NOT directly from .env