import budget_management.base_handler
import budget_management.data_access_layer


class AddIncome(budget_management.base_handler.BaseHandler):
    async def post(self):
        self._data_access_layer = budget_management.data_access_layer.instance()

        date = self.json_body_argument('date', ensure_types=[str])
        title = self.json_body_argument('title', ensure_types=[str])
        amount = self.json_body_argument('amount', ensure_types=[str, int, float])
        category = self.json_body_argument('category', ensure_types=[str])

        item = {
            "date": date,
            "title": title,
            "amount": float(amount),
            "category": category
        }

        print(f"inserting income={item}")
        insert_result = await self._data_access_layer.insert_one('incomes', item)
        self.write({"id": insert_result.inserted_id})
