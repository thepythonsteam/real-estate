import pandas as pd
import numpy as np
df_poi = pd.read_csv('../data/df_poi.csv', sep='|')

poi_classes = df_poi['type'].unique()
most_popular_pois = list(df_poi['name'].value_counts()[:15].index)
pois_ = list(df_poi['type'].value_counts().index)[:10]

df_poi = df_poi[(df_poi['type'].isin(poi_classes))|(df_poi['name'].isin(most_popular_pois))|(df_poi['name'].isin(pois_))].reset_index(drop=True)

def distance(x1, x2, y1, y2):
    return np.sqrt(np.power((x1 - x2), 2) + np.power((y1 - y2), 2))

def find_in_radius(lontd, lattd, df_query, r=0.005):
    distances = distance(lontd, df_query['longitude'].values, lattd, df_query['latitude'].values)
                         
    distances = pd.Series(distances, index=df_query.index)
    distances = distances[distances < r]
    return distances.sort_values(ascending=True)

def f(x):
    lattd = x[0]
    lontd = x[1]
    local_features = dict()
    
    # POI based features
    for radius in [0.001, 0.002]:
        poi_tmp = df_poi[(df_poi['latitude'].between(lattd - radius, lattd + radius))& \
                           (df_poi['longitude'].between(lontd - radius, lontd + radius))]
        poi_distances = find_in_radius(lontd, lattd, poi_tmp, radius)
        local_features['poi_n_r'+str(radius)] = len(poi_distances)
        pois = poi_tmp.loc[poi_distances.index]
        for class_ in pois_:
            local_features['poi_n_'+class_+'_r'+str(radius)] = len(pois[pois['name']==class_])
    

        for mpp in most_popular_pois:
            pois_mpp = pois[pois['name']==mpp]
            local_features['poi_n_'+mpp] = len(pois_mpp)
            if len(pois_mpp) > 0:
                local_features['poi_closest_'+mpp] = poi_distances[pois_mpp.index[0]]
            else:
                local_features['poi_closest_'+mpp] = radius
                
        for pc in poi_classes:
            pois_pc = pois[pois['type']==pc]
            local_features['poi_n_'+mpp] = len(pois_pc)
            if len(pois_pc) > 0:
                local_features['poi_closest_'+mpp] = poi_distances[pois_pc.index[0]]
            else:
                local_features['poi_closest_'+mpp] = radius
            
    return local_features


def inference(x):
    lattd = x[0]
    lontd = x[1]
    local_features = dict()
    
    # POI based features
    for radius in [0.002]:
        poi_tmp = df_poi[(df_poi['latitude'].between(lattd - radius, lattd + radius))& \
                           (df_poi['longitude'].between(lontd - radius, lontd + radius))]
        poi_distances = find_in_radius(lontd, lattd, poi_tmp, radius)
        local_features['poi_n_r'+str(radius)] = len(poi_distances)
            
    return local_features