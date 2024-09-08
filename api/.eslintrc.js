module.exports = {
  env: {
    node: true
  },
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['import', 'simple-import-sort', 'unused-imports'],
  rules: {
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    'import/first': 1,
    'import/newline-after-import': 1,
    'import/no-duplicates': 1,
    'import/no-absolute-path': 1,
    'unused-imports/no-unused-imports': 1
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: __dirname
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier'
      ],
      plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
      rules: {
        '@typescript-eslint/no-inferrable-types': 2,
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/no-empty-interface': 2,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_'
          }
        ],
        'no-constant-condition': ['error', { checkLoops: false }],
        curly: ['error', 'multi'],
        'padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: 'return'
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'throw'
          },
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*'
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var']
          }
        ]
      }
    }
  ]
};
