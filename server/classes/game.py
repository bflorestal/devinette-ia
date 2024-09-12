class Game:
    def __init__(self, data):
        self.id = str(data["_id"])
        self.image_file = data["image_file"]
        self.user = data["user"]
        self.model = data["model"]
        self.correct_answer = data["correct_answer"]

    def to_dict(self):
        return {
            "id": self.id,
            "image_file": self.image_file,
            "user": self.user,
            "model": self.model,
            "correct_answer": self.correct_answer
        }
