# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**categories**](#categories) | **GET** /categories | |
|[**category**](#category) | **GET** /categories/{category} | |
|[**item**](#item) | **GET** /items/{item} | |
|[**items**](#items) | **GET** /items | |
|[**player**](#player) | **GET** /players/{player_uuid} | |
|[**players**](#players) | **GET** /players | |
|[**stats**](#stats) | **GET** /stats | |

# **categories**
> Array<StatCategory> categories()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.categories();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<StatCategory>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **category**
> Array<PlayerStat> category()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let category: string; // (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let order: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.category(
    category,
    limit,
    page,
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **category** | [**string**] |  | defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **order** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<PlayerStat>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**404** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **item**
> Array<PlayerStat> item()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let item: string; // (default to undefined)
let category: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let order: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.item(
    item,
    category,
    limit,
    page,
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **item** | [**string**] |  | defaults to undefined|
| **category** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **order** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<PlayerStat>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**404** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **items**
> Array<Item> items()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.items();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Item>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **player**
> Array<PlayerStat> player()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let playerUuid: string; // (default to undefined)
let category: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let order: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.player(
    playerUuid,
    category,
    limit,
    page,
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **playerUuid** | [**string**] |  | defaults to undefined|
| **category** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **order** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<PlayerStat>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **players**
> Array<Player> players()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.players();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Player>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **stats**
> Array<PlayerStat> stats()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let item: string; // (optional) (default to undefined)
let category: string; // (optional) (default to undefined)
let playerUuid: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let order: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.stats(
    item,
    category,
    playerUuid,
    limit,
    page,
    order
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **item** | [**string**] |  | (optional) defaults to undefined|
| **category** | [**string**] |  | (optional) defaults to undefined|
| **playerUuid** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **order** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<PlayerStat>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**500** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

