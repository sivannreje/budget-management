import json
import tornado.web


class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        super(BaseHandler, self).initialize()

    async def prepare(self):
        if len(self.request.body) > 0:
            self.request.json = json.loads(self.request.body)

    def json_body_argument(self, key, *, ensure_types):
        if key not in self.request.json:
            raise tornado.web.HTTPError(400, 'argument missing from request')
        value = self.request.json[key]
        self._ensure_type(value, ensure_types)
        return value

    def query_string_argument(self, key, *, default=None):
        value = self.get_query_argument(key, default)
        if value is None:
            raise tornado.web.HTTPError(400, f'argument {key} is missing from request')
        self._ensure_type(value, str)
        return value

    def _ensure_type(self, value, expected_types):
        if type(value) not in expected_types:
            raise tornado.web.HTTPError(400, f'could not interpret request')
