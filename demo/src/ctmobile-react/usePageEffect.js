import React, { useImperativeHandle } from 'react';

export default (ref, config) => useImperativeHandle(ref, () => config);
