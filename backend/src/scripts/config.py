import pandas as pd
import mysql.connector

# -------------------------------------------------------------------------------

# Per file configurations

# Exclude groups to properly set data to properties and property_group
excludedGroups = ["Taustaandmed", "Kodune keelekeskkond"]
excludedProperties = ["Kommentaarid"]

# Excel file
dataframe = pd.read_excel('./data/qv-2020-1.ods', index_col=0, header=2)

# -------------------------------------------------------------------------------

# Database connection
childMI = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database="childMI"
)

cursor = childMI.cursor()