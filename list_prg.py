# List class
datelist = ["10-may", "12-oct", "30-may", "15-jan","21-feb"]

import datetime
month = datetime.date.today().strftime("%b").lower()
for elem in datelist:
	dd,mm = elem.split("-")
	if mm == month:
		print(elem)
