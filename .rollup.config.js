import babel from 'rollup-plugin-babel'

const isRelease = process.env['BUILD_MODE'] === 'release'

const plugins = [
  babel({
    babelrc: false,
    comments: false,
    presets: [
      [
        'env',
        {
          'modules': false,
          'targets': {
            'browsers': [
              'last 1 chrome version',
              'last 1 firefox version',
              'last 1 safari version',
              'last 1 ios_saf version'
            ]
          }
        }
      ]
    ],
    plugins: [
      'external-helpers',
      'transform-function-bind'
    ]
  })
]

export default {
  plugins: plugins,
  sourceMap: !isRelease,
  format: 'iife'
}
