# Bug Out Ready -- https://bug-out-ready.wjacobs710.now.sh/

Things don't always go as planned. You can't bre ready for everything. You can however be ready for some common natural disasters and emergencies in general. This app is meant to be a starting point. A catalyst for though about what would you do in those situations? Would you be ready?


## API Endpoints
bugoutready.now.sh/api/auth 
    This endpoint is used for authentication of login and registration. This has a new "/sign-up" for the creation of a new user with "user_name", and "password" in the request body.
    "/login" uses the same body requirements but stores the password hashed and requires JWT to auth. 

bugoutready.now.sh/situations
    This endpoint is for creating a new bag. It takes a POST method requiring Authentication through JWT. The request body must have a "bag_name", "situations", and "user_id". The creation creates a new bag and populates it with items based on the situation. It will return the location/URL for the bag. 

bugoutready.now.sh/bags
    This endpoint is a GET method endpoint. 
    The GET route requires a user.id in the body and will return all bags that are identified as the users. 
bugoutready.now.sh/bag-home
    This endpoint has a GET, DELETE, and PATCH method available. 
    This is to get the items in the specific bag, delete that bag, and PATCH when an item is selected as owned. All routes require authentication and the "bag_id". The PATCH route also requires the "item_id" and updated "owned" status.


 