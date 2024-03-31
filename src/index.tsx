import dva from 'dva';
import '../style/index.scss'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
let model = [  './loginPages/loginModel' ]
// 3. Model
model.map(i=>{ app.model(require(`${i}`).default); })

// console.log(app.model)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
