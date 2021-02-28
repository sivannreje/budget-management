import budget_management.base_handler
import budget_management.data_access_layer
import bson


class EditExpense(budget_management.base_handler.BaseHandler):
    async def post(self):
        self._data_access_layer = budget_management.data_access_layer.instance()

        id_ = self.json_body_argument('id', ensure_types=[str])

        date = self.json_body_argument('date', ensure_types=[str])
        title = self.json_body_argument('title', ensure_types=[str])
        amount = self.json_body_argument('amount', ensure_types=[str, int, float])
        category = self.json_body_argument('category', ensure_types=[str])

        update_item = {
            "date": date,
            "title": title,
            "amount": float(amount),
            "category": category
        }

        print(f"updating expense id={id_} with {update_item}")
        updated = await self._data_access_layer.update_one('expenses', {"_id": bson.ObjectId(id_)}, **update_item)
        self.write({"updated": updated.matched_count > 0})
