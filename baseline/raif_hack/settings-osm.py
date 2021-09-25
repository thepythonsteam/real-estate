TARGET = 'per_square_meter_price'
# признаки (или набор признаков), для которых применяем smoothed target encoding
CATEGORICAL_STE_FEATURES = ['region', 'city', 'realty_type']

# признаки, для которых применяем one hot encoding
CATEGORICAL_OHE_FEATURES = []

# численные признаки
NUM_FEATURES = ['lat', 'lng', 'osm_amenity_points_in_0.001',
       'osm_amenity_points_in_0.005', 'osm_amenity_points_in_0.0075',
       'osm_amenity_points_in_0.01', 'osm_building_points_in_0.001',
       'osm_building_points_in_0.005', 'osm_building_points_in_0.0075',
       'osm_building_points_in_0.01', 'osm_catering_points_in_0.001',
       'osm_catering_points_in_0.005', 'osm_catering_points_in_0.0075',
       'osm_catering_points_in_0.01', 'osm_city_closest_dist',
       'osm_city_nearest_population',
       'osm_crossing_closest_dist', 'osm_crossing_points_in_0.001',
       'osm_crossing_points_in_0.005', 'osm_crossing_points_in_0.0075',
       'osm_crossing_points_in_0.01', 'osm_culture_points_in_0.001',
       'osm_culture_points_in_0.005', 'osm_culture_points_in_0.0075',
       'osm_culture_points_in_0.01', 'osm_finance_points_in_0.001',
       'osm_finance_points_in_0.005', 'osm_finance_points_in_0.0075',
       'osm_finance_points_in_0.01', 'osm_healthcare_points_in_0.005',
       'osm_healthcare_points_in_0.0075', 'osm_healthcare_points_in_0.01',
       'osm_historic_points_in_0.005', 'osm_historic_points_in_0.0075',
       'osm_historic_points_in_0.01', 'osm_hotels_points_in_0.005',
       'osm_hotels_points_in_0.0075', 'osm_hotels_points_in_0.01',
       'osm_leisure_points_in_0.005', 'osm_leisure_points_in_0.0075',
       'osm_leisure_points_in_0.01', 'osm_offices_points_in_0.001',
       'osm_offices_points_in_0.005', 'osm_offices_points_in_0.0075',
       'osm_offices_points_in_0.01', 'osm_shops_points_in_0.001',
       'osm_shops_points_in_0.005', 'osm_shops_points_in_0.0075',
       'osm_shops_points_in_0.01', 'osm_subway_closest_dist',
       'osm_train_stop_closest_dist', 'osm_train_stop_points_in_0.005',
       'osm_train_stop_points_in_0.0075', 'osm_train_stop_points_in_0.01',
       'osm_transport_stop_closest_dist', 'osm_transport_stop_points_in_0.005',
       'osm_transport_stop_points_in_0.0075',
       'osm_transport_stop_points_in_0.01',
       'reform_count_of_houses_1000', 'reform_count_of_houses_500',
       'reform_house_population_1000', 'reform_house_population_500',
       'reform_mean_floor_count_1000', 'reform_mean_floor_count_500',
       'reform_mean_year_building_1000', 'reform_mean_year_building_500','total_square', 
       'poi_n_r0.001', 'poi_n_bus_stop_r0.001', 'poi_n_cafe_r0.001', 'poi_n_supermarket_r0.001',
       'poi_n_atm_r0.001', 'poi_n_bank_r0.001', 'poi_n_clothes_r0.001', 'poi_n_fast_food_r0.001',
       'poi_n_hairdresser_r0.001', 'poi_n_restaurant_r0.001', 'poi_n_tram_stop_r0.001',
       'poi_n_Sberbank', 'poi_closest_Sberbank', 'poi_n_Pjaterochka', 'poi_closest_Pjaterochka',
       'poi_n_Magnit', 'poi_closest_Magnit', 'poi_n_DNS', 'poi_closest_DNS',
       'poi_n_Diksi', 'poi_closest_Diksi', 'poi_n_Krasnoe__Beloe', 'poi_closest_Krasnoe__Beloe',
       'poi_n_KrasnoeBeloe', 'poi_closest_KrasnoeBeloe', 'poi_n_MTS', 'poi_closest_MTS',
       'poi_n_VTB', 'poi_closest_VTB', 'poi_n_Coffee_Like', 'poi_closest_Coffee_Like',
       'poi_n_Stolovaja', 'poi_closest_Stolovaja', 'poi_n_Svjaznoj', 'poi_closest_Svjaznoj',
       'poi_n_Bristol', 'poi_closest_Bristol', 'poi_n_Burger_King', 'poi_closest_Burger_King',
       'poi_n_Alfa-Bank', 'poi_closest_Alfa-Bank', 'poi_n_r0.002', 'poi_n_bus_stop_r0.002',
       'poi_n_cafe_r0.002', 'poi_n_supermarket_r0.002', 'poi_n_atm_r0.002', 'poi_n_bank_r0.002',
       'poi_n_clothes_r0.002', 'poi_n_fast_food_r0.002', 'poi_n_hairdresser_r0.002',
       'poi_n_restaurant_r0.002', 'poi_n_tram_stop_r0.002']

MODEL_PARAMS = dict(
            n_estimators=2000,
            learning_rate=0.01,
            reg_alpha=1,
            num_leaves=40,
            min_child_samples=5,
            importance_type="gain",
            n_jobs=1,
            random_state=563,
        )

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {"format": "%(asctime)s %(name)-12s %(levelname)-8s %(message)s"},
    },
    "handlers": {
        "file_handler": {
            "level": "INFO",
            "formatter": "default",
            "class": "logging.FileHandler",
            "filename": 'train.log',
            "mode": "a",
        },
    },
    "loggers": {
        "": {"handlers": ["file_handler"], "level": "INFO", "propagate": False},
    },
}