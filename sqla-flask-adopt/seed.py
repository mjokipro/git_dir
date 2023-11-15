from app import db
from models import Pet

db.drop_all()
db.create_all()

Pet.query.delete()

p1 = Pet(name="Spot", species="Gecko")
p2 = Pet(name="Dot", species="Dog")
p3 = Pet(name="Cot", species="Dog")

db.session.add_all([p1, p2, p3])
db.session.commit()