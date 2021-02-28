import budget_management.base_handler
import budget_management.data_access_layer


class Expenses(budget_management.base_handler.BaseHandler):
    async def get(self):
        self._data_access_layer = budget_management.data_access_layer.instance()

        expenses = await self._data_access_layer.find_many('expenses', {})
        print(f"getting {len(expenses)}")
        self.write({"expenses": expenses})
