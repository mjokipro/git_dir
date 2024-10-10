
---
date: 2023-05-04
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

```python

# first arg: whole file, 2nd arg: bucket-name, 3rd: optional aws key name

# s3.upload_file(img_contents, AWS_BUCKET_NAME, key)

# s3.put_object(Body=img_contents, Bucket=AWS_BUCKET_NAME, Key=key)

s3.Bucket(AWS_BUCKET_NAME).put_object(Key=key, Body=img)
```