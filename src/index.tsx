import dva from 'dva';
import '../style/index.scss';
import '@wangeditor/editor/dist/css/style.css';
import urlConfig from './URL';

//init
const app = dva();

// 2. Plugins 使用插件
// app.use({});

// 3. Model
urlConfig.map(i=>{ 
    if(i.model) app.model(require(`${i.model}`).default); 
})

// console.log(app.model)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
