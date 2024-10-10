
---
date: 2023-05-11
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

AssetAccess
Referral
Buddy

1. Find all tables that reference user
2. Update username in those tables to slugified name
3. create new user with slugified name, and all other user data
4. delete user
5. save


```python
from django.apps import apps
from django.db.models import ForeignKey

def get_tables_related_to_user():
    User = apps.get_model("users", "User")
    all_models = apps.get_models()

    related_tables = []
    for model in all_models:
        for field in model._meta.get_fields():
            if isinstance(field, ForeignKey) and field.remote_field.model == User:
               # check what the name of that relationship is
		       # save old instance of that model in variable (buddy = )
		       # variable.name = new_user
               # variable.save

                related_tables.append(model._meta.db_table)
                break

    return related_tables

```