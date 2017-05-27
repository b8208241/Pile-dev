import {CompositeDecorator} from 'draft-js';
//import {questionmarkDecorator, hyphenDecorator} from './decorator/Decorators.js';
//import questionmarkStrategy from './decorator/questionmarkStrategy.js'
//import hyphenStrategy from './decorator/hyphenStrategy.js';

/*
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const questionmarkStrategy2 = _interopRequireDefault(questionmarkStrategy);
const hyphenStrategy2 = _interopRequireDefault(hyphenStrategy);
decorator.push({
  strategy: questionmarkStrategy2.default,
  component: questionmarkDecorator,
},{
  strategy: hyphenStrategy2.default,
  component: hyphenDecorator,
})
*/
export const pluginsDecoratorCreate = (pluginsArr, decoratorsArr) => {
  const decorators = pluginsArr
    .filter((plugin) => plugin.decorators !== undefined)
    .map((plugin) => {return plugin.decorators[0]});
  if(decoratorsArr){
    decoratorsArr.forEach(
      function(obj){
        decorators.push(obj);
      }
    )
  }
  return new CompositeDecorator(decorators);
}
