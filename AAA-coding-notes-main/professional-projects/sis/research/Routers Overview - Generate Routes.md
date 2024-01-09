

```python 

class SISApiRootView(routers.APIRootView):
    """
API for our Student Information System. The API is cohort-specific; it
shows only things related to the cohort.

For non-admin users, it shows only public information; for admin users,
it also shows private information.

This is the browsable version of this API; you can also visit the
[documentation website](/api/-docs/).
"""

    def get_view_name(self):
        return "API"


router = DefaultRouter()
router.APIRootView = SISApiRootView()

```

-> Sets up `DefaultRouter()`
-> Overwrites default `router.APIRootView`



```python

router.register("assessmentsessions", assessments_api.AssessmentSessionViewSet)
router.register("assets", assets_api.AssetViewSet)
router.register("cohorts", courses_api.CohortViewSet)
router.register("events", events_api.EventViewSet)
router.register("exercisesessions", exercises_api.ExerciseSessionViewSet)
router.register("lecturesessions", lectures_api.LectureSessionViewSet)
router.register("projectsessions", projects_api.ProjectSessionViewSet)
router.register("staff", staff_api.StaffMemberViewSet)
router.register("students", students_api.EnrollmentViewSet)
router.register("submissions", assessments_api.SubmissionViewSet)
router.register("resourcesessions", resources_api.ResourceSessionViewSet)
router.register("applicants", apply_api.ApplicantViewSet)
# router.register("applications", apply_api.ApplicationViewSet)
router.register("bootcampapplications", apply_api.BootcampApplicationViewSet)

```

-> `.register()` takes two arguments: the `basename`  (what are we going to use as a base for the endpoints?) and the `viewset`, which is a class that encapsulates CRUD routes for the api. 

# Example:

```python

from rest_framework import routers, viewsets, serializers
from .models import Dog

class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = '__all__'

class DogViewSet(viewsets.ModelViewSet):
    queryset = Dog.objects.all()
    serializer_class = DogSerializer

router = routers.SimpleRouter()
router.register(r'dogs', DogViewSet)

urlpatterns = router.urls

```

This code will generate the following routes for our Dog model:

-   GET /dogs/ - list all dogs
-   POST /dogs/ - create a new dog
-   GET /dogs/{id}/ - retrieve a specific dog
-   PUT /dogs/{id}/ - update a specific dog
-   PATCH /dogs/{id}/ - partially update a specific dog
-   DELETE /dogs/{id}/ - delete a specific dog