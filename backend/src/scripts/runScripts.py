import subprocess

print("Insert sheet data: ")
subprocess.call("insertSheet.py", shell=True)

print("Insert property groups data: ")
subprocess.call("insertPropertyGroups.py", shell=True)

print("Insert properties data: ")
subprocess.call("insertProperties.py", shell=True)

print("Insert teachers data: ")
subprocess.call("insertTeacher.py", shell=True)

print("Insert schools data: ")
subprocess.call("insertSchools.py", shell=True)

print("Insert teacher schools data: ")
subprocess.call("insertTeacherSchool.py", shell=True)

print("Insert languages data: ")
subprocess.call("insertLanguage.py", shell=True)

print("Insert children data: ")
subprocess.call("insertChild.py", shell=True)

print("Insert children properties data: ")
subprocess.call("insertChildProperties.py", shell=True)

print("Insert teacher children data: ")
subprocess.call("insertTeacherChildren.py", shell=True)

print("Insert children languages data: ")
subprocess.call("insertChildLanguage.py", shell=True)

print("Insert comments data: ")
subprocess.call("insertComment.py", shell=True)
