// 1. Http Request Method
// |HTTP Method| Description                                       | Idempotent | Safe   |
// |           |                                                   |            |        |
// | GET       | Retrieves data from the server.                   | Yes        | Yes    |
// | POST      | Sends data to the server to create a new resource.| No        | No     |
// | PUT       | Updates or creates a resource at a specific URL.  | Yes        | No     |
// | DELETE    | Deletes the specified resource from the server.   | Yes        | No     |
// | HEAD      | Same as GET, but only retrieves headers.          | Yes        | Yes    |
// | OPTIONS   | Describes communication options for a resource.   | Yes        | Yes    |
// | PATCH     | Partially updates a resource at a specific URL.   | No         | No    |


// idempotnet:- Same Http is going one or one millon time , it final state should be same.

// GET	                Yes (Doesn’t change server data. Repeating gives same result.)
// HEAD	             No (Like GET but without body. No side effects.)
// PUT	                Yes	(Overwrites the same resource — effect stays same.)
// DELETE            Yes	(Deletes the same resource; further deletes have no effect.)
// OPTIONS	Yes	(Just returns info; no changes made.)
// POST	        No	(Creates new resources or triggers different results each time.)
// PATCH	        No	(Partial updates can stack or multiply effects.)



// => Status Code 
// it is a 3 digit number that tells server or client what happened with request.

// Cateogious of status code
// 1xx → Informational ((Not Used Mainly))
// 2xx → Success
// 3xx → Redirection
// 4xx → Client Error
// 5xx → Server Error

// note:- 
    // In Http we can set response StatusCode using:
    // res.statusCode = 400;