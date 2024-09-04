from question import Question
def extract_code(str1):
    pass
    ques="";
    code=""
    count_ch=0;
    #print(str1)
    for i in range(len(str1)):
        if(str1[i]=="`" and count_ch<3):
            count_ch += 1
            ques+=str1[i];
        elif(count_ch<3):
            ques+=str1[i];
            count_ch =0;
        else:
            code+=str1[i];
    return[ques[:-5],code[11:-5]]

def manin_function2(list2:Question):
    list1=[];
    with open('README.md', 'r') as file:
        data = file.read().rstrip()
    #print(data);

    count_hash=0;
    ans_flag=False;
    str1="";
    for i in range(len(data)):
        pass
        if(data[i]=="#"):
            count_hash+=1;
            if(count_hash==6):
                list1.append(Question());
        elif(data[i]==":" and i>=3 and data[i-2]==" " and data[i-3]=="-" and data[i-1]>="A" and data[i-1]<="D"):
            pass
            ans_flag=True;
            
            if(count_hash==6):
                pass
                #print(str1);
                #raise Exception("hhhh");
                list1[len(list1)-1].question=str1[:-4];
                count_hash=0;
                str1="";

        elif(data[i]=="\n"):
            pass
            b1=False;
            if(ans_flag):
                list1[len(list1)-1].choice.append(str1);
                b1=True;
            elif(count_hash==4):
                list1[len(list1)-1].answer=str1;
                b1=True;
            else:
                if(not((data[i]=="\n" or data[i]==" ") and len(str1)==0)):
                    str1+=data[i];
            if(b1):
                str1="";
                ans_flag=False;
                count_hash=0;
            
        elif(count_hash==6 or count_hash==4 or ans_flag):
            if(not((data[i]=="\n" or data[i]==" ") and len(str1)==0)):
                str1+=data[i];
    for i in range(len(list1)):
        list_new=extract_code(list1[i].question)
        list1[i].question=list_new[0];
        list1[i].code=list_new[1];
    for i in range(len(list1)):
        list1[i].answer=list1[i].answer[len(list1[i].answer)-1]
    list2.extend(list1);