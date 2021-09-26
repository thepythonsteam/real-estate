import pickle
import numpy as np
from functools import partial

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from geopy.geocoders import Nominatim

from get_heatmap_data import generate_heatmap_data, get_heatmap_data

# Get model before starting the server
loaded_model = pickle.load(open('./files/model.sav', 'rb'))

# Generate heatmap_data before starting the server
generate_heatmap_data()

# Init geopy
geolocator = Nominatim(user_agent="@thepythonsteam/real-estate")
geocode = partial(geolocator.geocode, language='ru')

# Configure the server
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
    floor: Optional[int] = None
    area: Optional[float] = None


@app.post('/predict')
async def predict(dto: PredictRequestDto):
    # TODO use dto & real model
    loaded_model.predict(np.array([[3, 5]]))

    objectCoordinates = getCoordinatesByAddress(dto.address)
    print(objectCoordinates)

    return {
        'address': dto.address,
        'price': '100500 рублей',
        'factors': {
            'positive': [{'name': 'толчок'}],
            'negative': [{'name': 'жучок'}, {'name': 'паучок'}]
        },
        'mapData': {
            'objectCoordinates': objectCoordinates,
            'heatmap': get_heatmap_data()
        }
    }


def getCoordinatesByAddress(address: str):
    location = geocode(address)

    return [location.latitude, location.longitude]
