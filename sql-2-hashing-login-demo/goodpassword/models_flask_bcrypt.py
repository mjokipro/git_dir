from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

password = 'yodog2020'

hash = bcrypt.generate_password_hash(password)

check = bcrypt.check_password_hash(hash, password)