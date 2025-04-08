# Inventory Pro API Documentation

## Authentication Endpoints

### Get CSRF Token
```
GET /api/auth/csrf/
```
**Response:** Returns CSRF token for form submissions
```json
{
    "csrfToken": "token-value"
}
```

### Google OAuth Login
```
POST /api/auth/google/
```
**Request Body:**
```json
{
    "credential": "google-oauth-credential"
}
```
**Response:**
```json
{
    "user": {
        "id": 1,
        "email": "user@example.com",
        "name": "User Name"
    },
    "message": "Successfully logged in"
}
```

### Logout
```
POST /api/auth/logout/
```
**Response:**
```json
{
    "message": "Successfully logged out"
}
```

## Items Endpoints

### List Items
```
GET /api/items/
```
**Query Parameters:**
- `search` (optional): Search term for filtering items
- `category` (optional): Filter by category
- `page` (optional): Page number for pagination
- `page_size` (optional): Number of items per page

**Response:**
```json
{
    "count": 100,
    "next": "http://localhost:8000/api/items/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "Item Name",
            "description": "Item Description",
            "quantity": 10,
            "category": "Category",
            "created_at": "2025-04-08T02:49:20Z",
            "updated_at": "2025-04-08T02:49:20Z"
        }
    ]
}
```

### Create Item
```
POST /api/items/
```
**Request Body:**
```json
{
    "name": "New Item",
    "description": "Item Description",
    "quantity": 10,
    "category": "Category"
}
```
**Response:** Returns created item object

### Get Item Detail
```
GET /api/items/{id}/
```
**Response:** Returns single item object

### Update Item
```
PUT /api/items/{id}/
```
**Request Body:** Same as Create Item
**Response:** Returns updated item object

### Delete Item
```
DELETE /api/items/{id}/
```
**Response:** 204 No Content

## Error Responses

### Authentication Errors
```json
{
    "error": "Authentication credentials were not provided",
    "status_code": 401
}
```

### Validation Errors
```json
{
    "error": {
        "field_name": [
            "Error message"
        ]
    },
    "status_code": 400
}
```

### Not Found
```json
{
    "error": "Resource not found",
    "status_code": 404
}
```

## Testing the API

### Using curl

1. Get CSRF Token:
```bash
curl -X GET http://localhost:8000/api/auth/csrf/
```

2. List Items:
```bash
curl -X GET http://localhost:8000/api/items/
```

3. Create Item (with authentication):
```bash
curl -X POST http://localhost:8000/api/items/ \
  -H "Content-Type: application/json" \
  -H "X-CSRFToken: your-csrf-token" \
  -d '{"name": "Test Item", "description": "Test Description", "quantity": 1}'
```

### Using httpie

1. List Items:
```bash
http GET http://localhost:8000/api/items/
```

2. Create Item:
```bash
http POST http://localhost:8000/api/items/ \
  name="Test Item" \
  description="Test Description" \
  quantity:=1
```

## Rate Limiting

- Anonymous users: 100 requests per hour
- Authenticated users: 1000 requests per hour
- Throttling is applied per endpoint

## Notes

1. All endpoints require CSRF token for POST, PUT, DELETE requests
2. Authentication is required for all endpoints except CSRF token and Google OAuth login
3. All timestamps are in ISO 8601 format with UTC timezone
4. Pagination is enabled for list endpoints with default page size of 10