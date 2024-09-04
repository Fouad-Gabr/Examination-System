from pare_redme_file import manin_function2
from parse_txt_file import mainfunction1
import json
l1=[]
mainfunction1(l1);
print(len(l1));
manin_function2(l1);
print(len(l1));

for i in range(len(l1)):
    l1[i]=l1[i].to_map();

with open("questions.json","w") as f:
    json.dump({"result":l1},f);
