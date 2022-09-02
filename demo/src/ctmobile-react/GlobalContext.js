import React from 'react';

/**
 * 创建全局的Context
 */
const Context = React.createContext(undefined, undefined);

const { Provider, Consumer } = Context;

export { Provider, Consumer };
export default Context;
