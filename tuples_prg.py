# Tuples-class
# Constant Collection
# Immutable
# Faster than list
# Can be part of a Set
# Can be used as Dict-key
# Immutable -> Mutable (in-place and out-place)
# (Days of a week, months of a year)

a = (10,20,30,40,50)
print("Length " ,len(a))
if 40 in a:
    print("Element of a ", a)

b = a
print("Tuples equity ", a == b)
c = 10,20,30,40,50,60,70,80
print("Tuples equity ",a == c)
d = a + c
print("Tuple Merge ",d)
print("First element of Tuple a ",a[0])
print("Last four element of Tuple a ",a[-4:])
print("=================================================")
print("Tuple unpacking")
a, b, c = 10, 20, 30
print("a ", a, " b ", b, " c ", c)
e, *f, g = 10,20,30,50,60,40,70
print("e ", e, " f ", f, " g ", g)
dob = "15-aug-1947"
dd,mm,yy = dob.split("-")
print(dd, mm,yy)
