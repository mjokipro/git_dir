"""Generate CSVs of random data for Warbler.

Students won't need to run this for the exercise; they will just use the CSV
files that this generates. You should only need to run this if you wanted to
tweak the CSV formats or generate fewer/more rows.
"""

import csv
from random import choice, randint, sample
from itertools import permutations
import requests
from faker import Faker
from helpers import get_random_datetime

MAX_WARBLER_LENGTH = 140

USERS_CSV_HEADERS = ['username', 'password', 'first_name', 'last_name', 'email',  'image_url', 'header_image_url']
MESSAGES_CSV_HEADERS = ['from_user', 'to_user', 'body']
TAGS_CSV_HEADERS = ['name']
POSTS_CSV_HEADERS = ['title', 'content', 'user_id']
POSTS_TAGS_CSV_HEADERS = ['post_id', 'tag_id']

NUM_USERS = 300
NUM_MESSAGES = 1000
NUM_TAGS = 5000
NUM_POSTS = 5000
NUM_POSTS_TAGS = 7000

fake = Faker()

# Generate random profile image URLs to use for users

image_urls = [
    f"https://randomuser.me/api/portraits/{kind}/{i}.jpg"
    for kind, count in [("lego", 10), ("men", 100), ("women", 100)]
    for i in range(count)
]

# Generate random header image URLs to use for users

header_image_urls = [
    requests.get(f"http://www.splashbase.co/api/v1/images/{i}").json()['url']
    for i in range(1, 46)
]

with open('generator/users.csv', 'w') as users_csv:
    users_writer = csv.DictWriter(users_csv, fieldnames=USERS_CSV_HEADERS)
    users_writer.writeheader()

    for i in range(NUM_USERS):
        users_writer.writerow(dict(
            username=fake.user_name(),
            password='$2b$12$Q1PUFjhN/AWRQ21LbGYvjeLpZZB6lfZ1BPwifHALGO6oIbyC3CmJe',
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.email()
     
         
      
        ))

with open('generator/messages.csv', 'w') as messages_csv:
    messages_writer = csv.DictWriter(messages_csv, fieldnames=MESSAGES_CSV_HEADERS)
    messages_writer.writeheader()

    for i in range(NUM_MESSAGES):
        messages_writer.writerow(dict(
            from_user=fake.user_name()[:MAX_WARBLER_LENGTH],
            to_user=fake.user_name()[:MAX_WARBLER_LENGTH],
            body=fake.paragraph()
        ))
        
with open('generator/tags.csv', 'w') as tags_csv:
    tags_writer = csv.DictWriter(tags_csv, fieldnames=TAGS_CSV_HEADERS)
    tags_writer.writeheader()

    for i in range(NUM_TAGS):
        tags_writer.writerow(dict(
            name=fake.tag()[:MAX_WARBLER_LENGTH]
        ))

with open('generator/posts.csv', 'w') as posts_csv:
    posts_writer = csv.DictWriter(posts_csv, fieldnames=POSTS_CSV_HEADERS)
    posts_writer.writeheader()

    for i in range(NUM_POSTS):
        posts_writer.writerow(dict(
            title=fake.sentence()[:MAX_WARBLER_LENGTH],
            content=fake.paragraphe()[:MAX_WARBLER_LENGTH],
            user_id=randint(1, NUM_USERS)

        ))
        
# Generate follows.csv from random pairings of users

with open('generator/posts_tags.csv', 'w') as posts_tags_csv:
    all_pairs = list(permutations(range(1, NUM_USERS + 1), 2))

    posts_tags_writer = csv.DictWriter(posts_tags_csv, fieldnames=POSTS_TAGS_CSV_HEADERS)
    posts_tags_writer.writeheader()

    for post_id, tag_id in sample(all_pairs, NUM_USERS):
        posts_tags_writer.writerow(dict(to_user=post_id, post_id=tag_id))
