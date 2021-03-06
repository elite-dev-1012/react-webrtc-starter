const { resolve } = require('path')

module.exports = api => {
  const { BABEL_ENV } = process.env
  const web = BABEL_ENV !== 'node'

  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'usage' : undefined,
          corejs: web ? 'core-js@3' : false,
          targets: !web ? { node: 'current' } : undefined,
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      ['module-resolver', {
        root: ['.'],
        alias: {
          '@client': './src/client',
          '@server': './src/server',
        },
      }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@loadable/babel-plugin'
    ]
  }
}