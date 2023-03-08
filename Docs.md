---
title: Pokedex v1.0.2
language_tabs:
  - js: javascript
language_clients:
  - js: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="pokedex">Pokedex v1.0.2</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

This API server of Pokedex App, written in GO

Base URLs:

* <a href="http://localhost:8080/api/v1">http://localhost:8080/api/v1</a>

<a href="http://swagger.io/terms/">Terms of service</a>
Email: <a href="mailto:syauqilenterano@gmail.com">Support</a> 

<h1 id="pokedex-auth">Auth</h1>

Everything about Authentication

## registerAccount

<a id="opIdregisterAccount"></a>

> Code samples

`POST /auth/register`

*Register User*

Register user use this API

> Body parameter

```json
{
  "username": "karessian1",
  "email": "mail@gmail.com",
  "password": "sscurePassword"
}
```

<h3 id="registeraccount-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» username|body|string|false|none|
|» email|body|string|false|none|
|» password|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "code": 200,
  "message": "Request is successs"
}
```

<h3 id="registeraccount-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request is success|[OK](#schemaok)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Internal Server Error|[BadRequest](#schemabadrequest)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Bad Request. check your payload..|[InternalServer](#schemainternalserver)|

<aside class="success">
This operation does not require authentication
</aside>

## getJWTToken

<a id="opIdgetJWTToken"></a>

> Code samples

`POST /auth`

*Authentication for Pokedex*

Authentication API to get your jwt token, if payload only provide email the

> Body parameter

```json
{
  "username": "karessian1",
  "password": "Abcde_12345"
}
```

<h3 id="getjwttoken-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» username|body|string|false|none|
|» password|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "code": 200,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

<h3 id="getjwttoken-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Authentication succeed JWT token provided.|[JWTToken](#schemajwttoken)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Internal Server Error|[BadRequest](#schemabadrequest)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Bad Request. check your payload..|[InternalServer](#schemainternalserver)|

<aside class="success">
This operation does not require authentication
</aside>

## get__auth_guest

> Code samples

`GET /auth/guest`

*Token for guest*

This API will generate you a jwt token for guest

> Example responses

> 200 Response

```json
{
  "code": 200,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

<h3 id="get__auth_guest-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Authentication succeed JWT token provided.|[JWTToken](#schemajwttoken)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Internal Server Error|[BadRequest](#schemabadrequest)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Bad Request. check your payload..|[InternalServer](#schemainternalserver)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pokedex-pokemon">Pokemon</h1>

Pokemon management system

## addPokemon

<a id="opIdaddPokemon"></a>

> Code samples

`POST /monsters`

*add pokemon*

API manages pokemon add

> Body parameter

```json
{
  "name": "psyduck"
}
```

<h3 id="addpokemon-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|false|none|

> Example responses

> 200 Response

```json
{
  "code": 200,
  "message": "Request is successs"
}
```

<h3 id="addpokemon-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Request is success|[OK](#schemaok)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Internal Server Error|[BadRequest](#schemabadrequest)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized. check your token|[Unauthorized](#schemaunauthorized)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden|[BadRequest](#schemabadrequest)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Bad Request. check your payload..|[InternalServer](#schemainternalserver)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Unauthorized">Unauthorized</h2>
<!-- backwards compatibility -->
<a id="schemaunauthorized"></a>
<a id="schema_Unauthorized"></a>
<a id="tocSunauthorized"></a>
<a id="tocsunauthorized"></a>

```json
{
  "code": 401,
  "error": "Unauthorized. Your authentication failed"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|number|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_Forbidden">Forbidden</h2>
<!-- backwards compatibility -->
<a id="schemaforbidden"></a>
<a id="schema_Forbidden"></a>
<a id="tocSforbidden"></a>
<a id="tocsforbidden"></a>

```json
{
  "code": 403,
  "error": "Forbidden. You're not authorized to do this operation"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|number|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_NotFound">NotFound</h2>
<!-- backwards compatibility -->
<a id="schemanotfound"></a>
<a id="schema_NotFound"></a>
<a id="tocSnotfound"></a>
<a id="tocsnotfound"></a>

```json
{
  "code": 404,
  "error": "Not Found. the resource you requested is not found"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|number|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_OK">OK</h2>
<!-- backwards compatibility -->
<a id="schemaok"></a>
<a id="schema_OK"></a>
<a id="tocSok"></a>
<a id="tocsok"></a>

```json
{
  "code": 200,
  "message": "Request is successs"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|number|false|none|none|
|message|string|false|none|none|

<h2 id="tocS_BadRequest">BadRequest</h2>
<!-- backwards compatibility -->
<a id="schemabadrequest"></a>
<a id="schema_BadRequest"></a>
<a id="tocSbadrequest"></a>
<a id="tocsbadrequest"></a>

```json
{
  "code": 400,
  "error": "Bad Request: Payload vaidation error"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|number|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_InternalServer">InternalServer</h2>
<!-- backwards compatibility -->
<a id="schemainternalserver"></a>
<a id="schema_InternalServer"></a>
<a id="tocSinternalserver"></a>
<a id="tocsinternalserver"></a>

```json
{
  "code": 500,
  "error": "Internal Server Error"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|number|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_JWTToken">JWTToken</h2>
<!-- backwards compatibility -->
<a id="schemajwttoken"></a>
<a id="schema_JWTToken"></a>
<a id="tocSjwttoken"></a>
<a id="tocsjwttoken"></a>

```json
{
  "code": 200,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|number|false|none|none|
|token|string|false|none|none|

<h2 id="tocS_ApiResponse">ApiResponse</h2>
<!-- backwards compatibility -->
<a id="schemaapiresponse"></a>
<a id="schema_ApiResponse"></a>
<a id="tocSapiresponse"></a>
<a id="tocsapiresponse"></a>

```json
{
  "code": 0,
  "type": "string",
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer(int32)|false|none|none|
|type|string|false|none|none|
|message|string|false|none|none|

