# Program - String-Class
# It is acollection
# character encoding / unicode - utf-8/ utf-16/ utf-32 - used as application level - (priority)
# supports ASCII - Hardware level
# Unicode - evokes internationalization / localization unlike ASCII -> "A" - English -> Appropriate character in Japenese
# Converting  from ASCII -> Unicode
# Converting from Unicode -> ASCII

# 1. define string : a ="bengaluru"               |b|e|n|g|a|l|u|r|u|
#                                                  0 1 ...
# 2. string length : len(a)                      # a.__len__()

# 3. Indexing      : a[i]                        * a[0] -> 1st element ; a[-1] -> last element ; a[-4] -> last but 4th element

# 4. Slicing       :#* First 4        -> f4 = a[:4]
                    #* except first4  -> a[4:]
                    #* Last 4         -> l4 = a[-4:]
                    #* except first4  -> a[2:]
                    #* except last4   -> a[:-4]
                    #* alternate      -> a[::2]
                    #* reverse        -> a[::-1]
                    #* alternate and reverse -> a[::2][::-1]
                    #* from 3 to 6 elment reversed -> a[3:6][::-1]

# 5. Search        :#* a = "bengaluru"
                    #* 'ben' in a -> True
                    #* 'ghi' in a -> False

# 6. Split         :#* returns a list
                        
# 7. Join          :#* res = "delimiter".join(LIST), d ="h-p-urty-" -> val = ("-").join(d)

# For loop 1 - 10 -> a[start:stop-1:step]
a = "bengaluru"
b = a[:6] # code lifting -> code takes care of creating the for-lipp while we pass the parameters.
print("Example of splicing converting %s to %s" %(a,b))
c = a[6:]
print("Remaining string - {0}".format(c))
d = a[::2]
print("Step values ", d)
e = a[6:2:-1]
print("Reverse string | Actual string - ", e, a[3:7], a[8:1:-2])
f = a[-4:]
print("Last four element ",f); 
Given = "arvindan"
First = Given[0].upper() + Given[1:]
Second = Given[0].upper() + Given[1:-1] + Given[-1].upper()
Third = Given[0:3].upper() + Given[3:-3] + Given[-3:].upper()
Four = Given[0:3].lower() + Given[3:].upper()[::-1] # Given[:3]+Given[:2:-1].upper()
print("--------------------------------------------------------------")
print("=============================Task 1===========================")
print("Give            | ", Given)
print("First           | ", First)
print("Second          | ", Second)
print("Third           | ", Third)
print("Four (Reversed) | ", Four)
print("--------------------------------------------------------------")
print("==========================Task 2 =============================")
sent = "today is a sunday which is a holiday"
first_word = sent.split(" ")[0]
last_word = sent.split(" ")[-1]
first_last_letter = sent.split(" ")[0][-1]
last_first_letter = sent.split(" ")[-1][0]
path = "/home/user5/data/report.xlsx"
filename = path.split("/")[4].split(".")[0]
filename_extn = path.split("/")[4]
extn = path.split("/")[4].split(".")[1]
path_val = "/".join(path.split("/")[:4])
info = "harish-blr-cse-20,18,20"
total_marks_array = info.split("-")[3].split(",")
total_marks = sum([int(e) for e in total_marks_array])
print("sent = ",sent)
print("first_word        | ", first_word)
print("last_word         | ", last_word)
print("first_last_letter | ", first_last_letter)
print("last_first_letter | ", last_first_letter)
print("--------------------------------------------")
print("path = ",path)
print("filename          | ", filename)
print("filename_extn     | ", filename_extn)
print("extn              | ", extn)
print("path_val          | ", path_val)
print("--------------------------------------------")
print("info ", info)
print("total_marks       | ",total_marks)
print("--------------------------------------------------------------")
print("=============================Task 3===========================")
a = "10,50,65,23,18"
b = a.split(",")
b_val = [int(e) for e in b]
b_val_add = [int(e)+1 for e in b]
b_val_str = [str(e) for e in b_val_add]
res = (",").join(b_val_str)
result = ",".join(str(int(e)+1) for e in a.split(","))
print("Increment element | ", res)
print("Increment elements| ", result)
