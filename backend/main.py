import pickle
import numpy as np

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

loaded_model = pickle.load(open('model.sav', 'rb'))
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class PredictRequestDto(BaseModel):
    address: str


@app.post('/predict')
async def predict(dto: PredictRequestDto):
    # TODO use real model
    loaded_model.predict(np.array([[3, 5]]))

    return {
        'address': dto.address,
        'price': '100500 рублей',
        'factors': {
            'positive': [{'name': 'толчок'}],
            'negative': [{'name': 'жучок'}, {'name': 'паучок'}]
        },
        'mapData': {}
    }
