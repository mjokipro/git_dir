
# REST Framework Library

Questions:
- Why use this library? What's the value add?
- What does it abstract/help with?

### 1. Why REST Framework?

**Abstracts the hard stuff:** The library comes with a robust grouping of middleware and ready-to-use components. These include:
		- **Built-in authentication/authorization**: Ready-to-use components for generating tokens and authenticating sessions. Supports multiple types of authorization/authentication.
		- **Browsable API:** There is a neat feature in the library where the API breaks down into into a browsable interface where you can play around w/ each route. 
		- **Automatically generates RESTful routes**: The `router` utility in the library can be used to automatically generate URL patterns for a given resource. (See Below)
		- **Built-in serializer**: There are serializer classes that helpfully help convert data from querysets into .json ahead of responding to an API call. 
		- **Robust viewsets**: As complex or simple as you want


## Documentation excerpts: 
### Routers and auto-generating url patterns
 [Usage](https://www.django-rest-framework.org/api-guide/routers/#usage)

Here's an example of a simple URL conf, that uses `SimpleRouter`.

```
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'accounts', AccountViewSet)
urlpatterns = router.urls
```

There are two mandatory arguments to the `register()` method:

-   `prefix` - The URL prefix to use for this set of routes.
-   `viewset` - The viewset class.

Optionally, you may also specify an additional argument:

-   `basename` - The base to use for the URL names that are created. If unset the basename will be automatically generated based on the `queryset` attribute of the viewset, if it has one. Note that if the viewset does not include a `queryset` attribute then you must set `basename` when registering the viewset.

The example above would generate the following URL patterns:

-   URL pattern: `^users/$` Name: `'user-list'`
-   URL pattern: `^users/{pk}/$` Name: `'user-detail'`
-   URL pattern: `^accounts/$` Name: `'account-list'`
-   URL pattern: `^accounts/{pk}/$` Name: `'account-detail'`


# Anatomy of an API call

Question:
- Where does it get triggered?


###### Making a staff member: 

Top-down overview:


1. Request sent to API endpoint
	-> Th

