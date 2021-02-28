import budget_management.base_handler
import budget_management.data_access_layer
import bson


class DeleteIncome(budget_management.base_handler.BaseHandler):
    async def post(self):
        self._data_access_layer = budget_management.data_access_layer.instance()

        id_ = self.json_body_argument('id', ensure_types=[str])

        print(f"deleting income id={id_}")
        deleted = await self._data_access_layer.delete_one('incomes', {"_id": bson.ObjectId(id_)})
        self.write({"deleted": deleted.deleted_count > 0})
