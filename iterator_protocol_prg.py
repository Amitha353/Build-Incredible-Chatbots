# Iterator Protocol - Python uses it excesively
# Requires a collection / iterable
# Star - default (begin | first element)
# Stop -> StopIteration Exception
# Cursor | iterator| Stateful -> Pointer to the collection entity -> Cursor moves on the iterable
# Consider - 100 Records and each needs 1GB RAM , sequential this  records are passed and each of them use the 1GB RAM

print("--------------------------------------------------------------")
print("------1. Increment Iterator - Handle Exception----------")
numlist = [10, 20, 30, 40]
it = iter(numlist)
print(next(it))
print(next(it))
print(next(it))
print(next(it))
# print(next(it)) #StopIteration
print("--------------------------------------------------------------")
print("------2. Increment Iterator - * ----------")
numlist = [10, 20, 30, 40]
it = iter(numlist)
print(*it)
print("--------------------------------------------------------------")
print("------3. Increment Iterator - list ----------")
numlist = [10, 20, 30, 40]
it = iter(numlist)
print(list(it))
print("--------------------------------------------------------------")
print("------4. Increment Iterator - ----------")
numlist = [10, 20, 30, 40]
it = iter(numlist)
a, b, c, d = it
print(a,b,c,d)
print("--------------------------------------------------------------")
numlist = [10, 20, 30, 40, 50, 60]
it = iter(numlist)
30 in it
print(*it)
print("--------------------------------------------------------------")
# Every for-loop recognizes StopIteration Exception
numlist = ["blr","chn","hyd","mum","tvm"]
for elem in numlist:
    print(elem[0])
print("--------------------------------------------------------------")
print("============ Iterating More than 1 collection ================")
clist = ["blr","chn","hyd","mum","tvm"]
slist = ["kar","tn","ts","mah","ker"]
for city, state in zip(clist, slist):
    print(city[0], "| ", city, " - ", state[0], "| ", state) # It becomes a list of tuples
print("--------------------------------------------------------------")
print("========== Capital the first letter 1 and last word ==========")
namelist = ["arun-kumar","ravi-shankar","hari-prasad", "john-peter"]
for el in namelist:
	print((el.split("-")[0][0]).upper() + (el.split("-")[1][0]).upper())
print("--------------------------------------------------------------")	
print("=================== Parallel Iterators =======================")
# In case of unequal list length - the lists become of the least list length
alst = namelist = ["arun-blr","ravi-chn","hari-hyd", "john-tvm"]
slist = ["kar","tn","ts","ker"]
for namecity, state in zip(alst, slist):
	print(namecity + "-" + state)
