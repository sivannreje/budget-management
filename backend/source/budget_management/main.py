import argparse
import tornado.ioloop
import tornado.web
from budget_management.expenses import add_expense, expenses, edit_expense, delete_expense
from budget_management.incomes import incomes, add_income, delete_income, edit_income
import json
import bson


class JsonBsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, bson.ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


def must_violate_privacy_to_serialize_mongo_object_id():
    json._default_encoder = JsonBsonEncoder()


def make_app(debug):
    must_violate_privacy_to_serialize_mongo_object_id()
    return tornado.web.Application(
            [
                ('/expenses', expenses.Expenses),
                ('/add_expense', add_expense.AddExpense),
                ('/edit_expense', edit_expense.EditExpense),
                ('/delete_expense', delete_expense.DeleteExpense),
                ('/incomes', incomes.Incomes),
                ('/add_income', add_income.AddIncome),
                ('/edit_income', edit_income.EditIncome),
                ('/delete_income', delete_income.DeleteIncome),

            ],
            debug=debug
            )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--debug', action='store_true')
    arguments = parser.parse_args()
    app = make_app(arguments.debug)
    print("Listening on port 5000")
    app.listen(5000)
    tornado.ioloop.IOLoop.current().start()
