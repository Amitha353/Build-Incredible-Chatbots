# Program => Sum of two numbers
# Purpose => Addition
# Input parameters => a and b
# Output parameters => answer

num1 = input("Enter a val: ") # input is always received in string format ->  10 becomes "10"
num2 = input("Enter a val: ")
#ans = num1 + num2 -> string '10'+'20' ='1020'
ans = int(num1) + int(num2) # 10 + 20 => 30
print("Final ans = %s + %s = %s" %(num1, num2, ans))
print("Result = {0} + {1} = {2}".format(num1, num2, ans))
