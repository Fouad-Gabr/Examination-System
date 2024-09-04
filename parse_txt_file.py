from question import Question
def mainfunction1( list1:Question):
    with open('question.txt', 'r') as file:
        data = file.read().rstrip()
    first_dot=False;
    #ans_flag=False;
    list1.append(Question());
    str1="";
    hash1=False;
    i=0;
    #print(data);
    while(i<len(data)):
        if(data[i]=="#"):
            #list1.pop();
            hash1=True;
            i+=1;
            continue;
        if(hash1 and data[i]=="\n"):
            i+=1
            break;
        if(data[i]=="." and ( not first_dot) and list1[len(list1)-1].question==""):
            first_dot=True
            str1="";
        elif(data[i]=="." and i>=2 and data[i-1]>="A" and data[i-1]<="D" and data[i-2]=="\n"):
            if(list1[len(list1)-1].question==""):
                #print(str1);
                #raise Exception();
                list1[len(list1)-1].question=str1[:-2];
                #print(list1[len(list1)-1].question);
                str1=""
            else:
                list1[len(list1)-1].choice.append(str1[:-2]);
                str1="";
        elif(data[i]=="\n" and i>0 and data[i-1]=="\n" ):
            list1[len(list1)-1].choice.append(str1[:-1]);
            first_dot=False;
            #print(list1[len(list1)-1].question)
            #print(list1[len(list1)-1].choice);
            #print("********************************")
            list1.append(Question());
            str1="";
        else:
            str1+=data[i];
        i+=1;
    #list1[len(list1)-1].choice.append(str1)
    #print(list1[len(list1)-1].choice);
    #print(list1[len(list1)-1].question);

    index_ques=0;
    while(i<len(data)):
        if(data[i]>="A" and data[i]<="B"):
            list1[index_ques].answer=data[i];
            index_ques+=1;
        i+=1
    