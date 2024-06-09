
const tsconfig = require('./tsconfig.json');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'boundaries'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dtos-lib/*'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      },
      node: {
        extensions: ['.js', '.ts']
      }
    },
    'boundaries/elements': [
      {
        mode: 'folder',
        type: 'domain',
        pattern: 'src/domain/*',
      },
      {
        mode: 'folder',
        type: 'infrastructure',
        pattern: 'src/infrastructure/*'
      },
      {
        mode: 'folder',
        type: 'services',
        pattern: 'src/services/*'
      },
      {
        mode: 'folder',
        type: 'config',
        pattern: 'src/config/*'
      },
      {
        mode: 'folder',
        type: 'api',
        pattern: 'src/api/*'
      },
      {
        mode: 'folder',
        type: 'tests',
        pattern: 'src/tests/*'

      }
    ]
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-relative-packages': 'error', // Ensure all imports are not relative
    'import/no-unresolved': 'error', // Ensure all imports can be resolved,
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          'mediasoup/**',
          ...Object.keys(require('./tsconfig.json').compilerOptions.paths).map(key => key.replace('*', '**'))
        ]
      }
    ],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'domain',
            allow: ['domain','config']
          },
          {
            from: 'infrastructure',
            allow: ['infrastructure', 'config', 'domain', 'services']
          },
          {
            from: 'services',
            allow: ['services', 'config', 'domain', 'infrastructure', 'api'] // TODO: Services should not have direct access to API
          },
          {
            from: 'api',
            allow: ['api', 'config', 'domain', 'services', 'infrastructure'] // TODO: API should not have direct access to infrastructure
          },
          {
            from: 'tests',
            allow: ['tests', 'domain', 'services', 'api', 'infrastructure', 'config']
          }
        ]
      },
    ],
    'boundaries/no-private': 'error'
  },
};
