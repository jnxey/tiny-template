import { CreateApp, Router } from 'node-tiny';
import config from '@/config';
import { Home } from '@/controller/home';
import { swagger } from '@/plugins/swagger';
import { BodyParser } from '@/plugins/body';

const app = new CreateApp();
const router = new Router();

app.run = async (context) => {
  const result = swagger(context, router);
  if (result) return;
  BodyParser.parse<object | string>(context.req)
    .then((body) => {
      context.setBody(body);
      router.work(context);
    })
    .catch((err) => {
      context.error(err);
    });
};

app.error = (err) => {
  // ...
  console.error(err);
};

router.config({ prefix: '/api' });

router.register(new Home());

app.listen(config.port, () => {
  console.log(`Server is running on:`);
  console.log(`- URL:   http://localhost:${config.port}`);
});
