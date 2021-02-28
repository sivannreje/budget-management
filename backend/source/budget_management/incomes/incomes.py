import budget_management.base_handler
import budget_management.data_access_layer


class Incomes(budget_management.base_handler.BaseHandler):
    async def get(self):
        self._data_access_layer = budget_management.data_access_layer.instance()

        incomes = await self._data_access_layer.find_many('incomes', {})
        print(f"getting {len(incomes)} incomes")
        self.write({"incomes": incomes})
