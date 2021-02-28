import motor
import motor.motor_asyncio

_instance = None


class DataAccessLayer:
    def __init__(self):
        self._initialize()

    def _initialize(self):
        client = motor.motor_asyncio.AsyncIOMotorClient()
        self._database = client['_database']

    @property
    def database(self):
        return self._database

    async def insert_one(self, collection, item):
        result = await self._database[collection].insert_one(item)
        return result

    async def delete_one(self, collection, query):
        result = await self._database[collection].delete_one(query)
        return result

    async def find_many(self, collection, query):
        cursor = self._database[collection].find(query)
        result = await self.async_list(cursor)
        return result

    async def update_one(self, collection, query, **kwargs):
        result = await self._database[collection].update_one(query, {'$set': kwargs})
        return result

    async def async_list(self, cursor):
        result = []
        async for doc in cursor:
            id = str(doc["_id"])
            doc["id"] = id
            doc.pop("_id")
            result.append(doc)
        return result

def instantiate():
    global _instance
    _instance = DataAccessLayer()


def instance():
    return DataAccessLayer()
