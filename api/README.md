# API 

## **Getting started**
1. Clone project & install dependencies
    - git clone `https://github.com/fiudev/assets.git`
    - `yarn` or `npm install`
2. Create `.env` file and setup `env` variables
    - sample [.env]("https://github.com/fiudev/assets/blob/master/api/.env.sample")    
3. run it `yarn dev` or `npm run dev`

---

## **Get assets**

## GET `/api/assets`

- Authorization - Not required
-
- Example request
- Receives the following query params
  - tag
  - page, default = 0
  - limit, default = 30

```
    example.com/api/assets?tag=student
```

or

```
    example.com/api/assets?tag=student?page=1?limit=20
```

- Returns

```
{
    "success": true,
    "data": {
        "currentPage": 0,
        "currentQuery": 2,
        "count": 6,
        "overallPages": 0,
        "assets": [
            {
                "tags": [ "tag1", "tag2"],
                "timestamp": "2018-10-02T16:55:00.332Z",
                "_id": "5bb3a383ef0adf15457e6b4c",
                "uploadedBy": "",
                "filename": "1538499459180-IMG_0158-3.jpg",
                "thumbnail": "/Path/To/File...",
                "original": "/Path/To/File...",
            },
            {
                "tags": [ "tag1", "tag2"],
                "timestamp": "2018-10-02T16:55:00.332Z",
                "_id": "5bb3a383ef0adf15457e6b5c",
                "uploadedBy": "",
                "filename": "1538499459180-IMG_0158-2.jpg",
                "thumbnail": "/Path/To/File...",
                "original": "/Path/To/File...",
            },
        ]
    }
```
---

## Login

## POST `/auth/tokens`

- Receives an `email` sent in the body of the request.

```
    {
        "email": "example@mail.com"
    }
```

- Returns a token to use for future requests.

```
{
    "success": true,
    "data": {
        "token": "eyJhb..."
    }
}
```
---
## Upload

## POST `/api/assets`

- Authorization - middleware `authUser`

```
    Authorization :"Bearer eyJhbGciOiJI..."
```

- Example request `FormData`
  - data = Array of images, max = 25
  - tags = Array of strings

```
    {
        data: [ img1, img2, .. ],
        tags: [ tag1, tag2, ... ]
    }
```

- Returns

```
{
   "success": true,
   "data": [
       {
           "uploadedBy": "",
           "filename": "1538681138482-IMG_0158.jpg",
           "tags": [ "tag1", "tag2" ],
           "thumbnail": "/Path/To/File...",
           "original": "/Path/To/File..."
       },
       {
           "uploadedBy": "",
           "filename": "1538681138482-IMG_0159.jpg",
           "tags": [ "tag1", "tag2" ],
           "thumbnail": "/Path/To/File...",
           "original": "/Path/To/File..."
       }
   ]
}
```
---

## Create User

## POST `/api/user`

- Authorization - middleware `authCreator`

```
    Authorization :"Bearer eyJhbGciOiJI..."
```

- Example request

```
{
    "email": "example@mail.com"
}
```
