class Question():
    pass
    def __init__(self):
        pass
        self.question ="";
        self.choice =[];
        self.answer="";
    def to_map(self):
        return {"question":self.question, "choice":self.choice,"answer":self.answer};