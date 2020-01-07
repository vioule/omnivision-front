// @flow

declare module 'react' {
  declare module.exports: any;
}

declare module 'react/cjs/react.development' {
  declare module.exports: any;
}

declare module 'react/cjs/react.production.min' {
  declare module.exports: any;
}

declare module 'react/umd/react.development' {
  declare module.exports: any;
}

declare module 'react/umd/react.production.min' {
  declare module.exports: any;
}

declare module 'react/umd/react.profiling.min' {
  declare module.exports: any;
}

// Filename aliases
declare module 'react/cjs/react.development.js' {
  declare module.exports: $Exports<'react/cjs/react.development'>;
}
declare module 'react/cjs/react.production.min.js' {
  declare module.exports: $Exports<'react/cjs/react.production.min'>;
}
declare module 'react/index' {
  declare module.exports: $Exports<'react'>;
}
declare module 'react/index.js' {
  declare module.exports: $Exports<'react'>;
}
declare module 'react/umd/react.development.js' {
  declare module.exports: $Exports<'react/umd/react.development'>;
}
declare module 'react/umd/react.production.min.js' {
  declare module.exports: $Exports<'react/umd/react.production.min'>;
}
declare module 'react/umd/react.profiling.min.js' {
  declare module.exports: $Exports<'react/umd/react.profiling.min'>;
}
