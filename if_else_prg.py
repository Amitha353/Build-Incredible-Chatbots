# if-else
# Use and/or/not

st1 = "arun-math-60-soc-67-sci-50"
st2 = "ravi-math-98-soc-50-sci-30"

st1_name = st1.split("-")[0]
st2_name = st2.split("-")[0]
st1_marks = st1.split("-")[2::2]
st2_marks = st2.split("-")[2::2]
st1_tmarks = sum([int(e) for e in st1_marks])
st2_tmarks = sum([int(e) for e in st2_marks])

if(st1_tmarks > st2_tmarks):
    print("Student scored max marks is",st1_name[0].upper()+st1_name[1:])
else:
    print("Student scored max marks is",st2_name[0].upper()+st2_name[1:])
    
