import bcrypt

salt = bcrypt.gensalt()

password = b'yodog2020'

new_pword = bcrypt.hashpw(password, salt)

new_salt = bcrypt.gensalt()

new_hash_salt = bcrypt.hashpw(password, new_salt)