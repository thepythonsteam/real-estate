from fastapi import FastAPI

import pickle
import numpy as np

loaded_model = pickle.load(open('model.sav', 'rb'))

result = loaded_model.predict(np.array([[3, 5]]))
print(result)

app = FastAPI()

@app.get('/predict')
async def predict():
    return {
        'price': '100500 рублей',
        'factors': {
            'positive': [{'name': 'толчок'}],
            'negative': [{'name': 'жучок'}, {'name': 'паучок'}]
        },
        'mapData': {}
    }
