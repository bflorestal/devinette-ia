class User:
    def __init__(self, data):
        self.id = str(data["_id"])
        self.username = data["username"]

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }
