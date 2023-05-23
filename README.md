# hatchways_assessment

Data Source
You will be building an API that requires you to fetch data from this API:
Request:
Route: https://api.hatchways.io/assessment/blog/posts
Method: GET
Query Parameters:

    Field: tag 
    Type: String (required)            
    Description: The tag associated with the blog post.


API Requirements
You need the following routes to your api:


ROUTE 1:

Request:

    Route: /api/ping
    Method: GET
    
Response:

    Response body (JSON):
    {
    "success": true
    }
    Response status code: 200
    
    
ROUTE 2:

Request:

    Route: /api/posts
    Method: GET
    
Query Parameters:

    Field: tags 
    Type: String (required)
    Description: A comma separated list of tags. 
    Default: N/A          
    Example: science, tech

    Field: sortBy 
    Type: String (optional)                
    Description: The field to sort the posts by. The acceptable fields are: id, reads, likes, popularity
    Default: id          
    Example: popularity

    Field: direction 
    Type: String (optional)                
    Description: The direction for sorting. The acceptable fields are: desc, asc
    Default: asc          
    Example: asc


