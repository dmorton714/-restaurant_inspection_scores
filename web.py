import pandas as pd 
import json
from arcgis.features import FeatureLayer

url = 'https://services1.arcgis.com/79kfd2K6fskCAkyg/arcgis/rest/services/FoodServiceData/FeatureServer/0'

batch_size = 1000  # Number of records to retrieve per batch
offset = 0  # Initial offset value
data_list = []
# ​Create the feature layer object
feature_layer = FeatureLayer(url)

while True:
    # Query the feature layer with pagination
    query_result = feature_layer.query(where='1=1', out_fields='*', return_geometry=False, result_offset=offset, result_record_count=batch_size)
    
    # Retrieve the features from the query result
    features = query_result.features
    
    # Process the data for the current batch
    for feature in features:
        data_list.append(feature.attributes)
    
    # Break the loop if the response is empty or the desired number of records is reached
    if len(features) == 0 or len(data_list) >= 1000:
        break
    
    # Increment the offset by the batch size
    offset += batch_size
# Create a DataFrame from the data list
df = pd.DataFrame(data_list)

cols_drop = ['EstablishmentID', 'InspectionID', 'PlaceName', 'Address2', 'TypeDescription', 'NameSearch', 'Intersection']
df.drop(cols_drop, axis=1, inplace=True)

# converts to date time 
df['InspectionDate'] = pd.to_datetime(df['InspectionDate'])

# sorting inspection dates
df.sort_values('InspectionDate', ascending=False, inplace=True)
# dropping duplicate rest based on its first occurrence
df.drop_duplicates(subset='EstablishmentName', keep='first', inplace=True)

processed_data = df.to_json(orient='records')

# Save the processed data as JSON to a file
with open('processed_data.json', 'w') as file:
    json.dump(processed_data, file)