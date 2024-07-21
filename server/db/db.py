from pymongo import MongoClient
from dotenv import load_dotenv
import sys
import os

load_dotenv()

class Db_connector:
    def __init__(self):
        self.mongo_config = {
            "host": os.getenv("MONGO_URI"),
            "database": os.getenv("MONGO_DB")
        }
        self.client = None
        self.db = None

    def __enter__(self):
        try:
            self.client = MongoClient(self.mongo_config["host"])
            self.db = self.client[self.mongo_config["database"]]
        except Exception as err:
            print(err)
            sys.exit()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if self.client:
            self.client.close()

    def selectAll(self, collection_name: str):
        try:
            collection = self.db[collection_name]
            result = collection.find()
            return list(result)  # Ensure cursor is converted to a list
        except Exception as err:
            print(err)
            sys.exit()

    def selectOne(self, collection_name: str, query: dict):
        try:
            collection = self.db[collection_name]
            result = collection.find_one(query)
            return result
        except Exception as err:
            print(err)
            sys.exit()

    def insert(self, collection_name: str, document: dict):
        try:
            collection = self.db[collection_name]
            result = collection.insert_one(document)

            return str(result.inserted_id)
        except Exception as err:
            print(err)
            sys.exit()

    def update(self, collection_name: str, query: dict, document: dict):
        try:
            collection = self.db[collection_name]
            collection.update_one(query, document)
        except Exception as err:
            print(err)
            sys.exit()

    def delete(self, collection_name: str, query: dict):
        try:
            collection = self.db[collection_name]
            collection.delete_one(query)
        except Exception as err:
            print(err)
            sys.exit()
