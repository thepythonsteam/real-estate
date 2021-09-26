import pandas as pd
import json

def generate_heatmap_data():
    df = pd.read_csv('./files/map_points.csv')

    min_cost = min(df['per_square_meter_price'])
    max_cost = max(df['per_square_meter_price'])

    diff = (max_cost - min_cost) / 3
    a = min_cost + diff
    b = max_cost - diff

    range1 = [min_cost, min_cost + diff]
    range2 = [range1[1], max_cost - diff]
    range3 = [range2[1], max_cost]

    # green -> red
    colors = ['#fee8c8', '#fdbb84', '#e34a33']
    r1 = []
    r2 = []
    r3 = []

    for i in range(len(df)):
        if df['per_square_meter_price'][i] <= range1[1]:
            r1.append([df['lat'][i], df['lng'][i]])
        elif range2[1] <= df['per_square_meter_price'][i]:
            r3.append([df['lat'][i], df['lng'][i]])
        else:
            r2.append([df['lat'][i], df['lng'][i]])

    result = {
        colors[0]: r1,
        colors[1]: r2,
        colors[2]: r3
    }


    with open('./files/heatmap.json', 'w') as outfile:
        json.dump(result, outfile)

    print('Successfully generated heatmap.json...')


def get_heatmap_data():
    result = None

    with open('./files/heatmap.json', 'r') as outfile:
        result = json.load(outfile)

    return result

