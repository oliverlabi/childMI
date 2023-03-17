import subprocess
from config import fileName, currentSheetID, currentSheetHeaderIndex, includesComments

print("File name:", fileName)
print("Current sheet ID:", currentSheetID)
print("Current sheet header index:", currentSheetHeaderIndex, "\n")

try:
    print("Insert sheet data: ")
    subprocess.check_call("insertSheet.py", shell=True)

    print("Insert property groups data: ")
    subprocess.check_call("insertPropertyGroups.py", shell=True)

    print("Insert properties data: ")
    subprocess.check_call("insertProperties.py", shell=True)

    print("Insert teachers data: ")
    subprocess.check_call("insertTeacher.py", shell=True)

    print("Insert schools data: ")
    subprocess.check_call("insertSchools.py", shell=True)

    print("Insert teacher schools data: ")
    subprocess.check_call("insertTeacherSchool.py", shell=True)

    print("Insert children data: ")
    subprocess.check_call("insertChild.py", shell=True)

    print("Insert children properties data: ")
    subprocess.check_call("insertChildProperties.py", shell=True)

    print("Insert teacher children data: ")
    subprocess.check_call("insertTeacherChildren.py", shell=True)

    if includesComments:
        print("Insert comments data: ")
        subprocess.check_call("insertComment.py", shell=True)
except subprocess.CalledProcessError:
    print("Script stopped because of an error")
