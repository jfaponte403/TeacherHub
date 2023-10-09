# Teacher hub back-end


### Teacherhub Authentication

#### Login

Returns a JW token
```http
  POST /auth/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Register

Returns a JW token
```http
  POST /auth/register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String (uuid)` | **Required**. A uuid string |
| `email`      | `String` | **Required**. |
| `nickname`      | `String` | **Required**. "Apodo" |
| `password`      | `String` | **Required**. |

### Teacherhub API

Link for testing with JW token.
Send a token in the header of the request.
```http
  GET /teacherhub/api/welcome
```





