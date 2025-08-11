module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'API_URL',
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@screens/*': ['src/screens/*'],
          '@screens': './src/screens',
          '@assets': './assets',
          '@api': './src/api',
          '@navigation': './src/navigation',
          'src/*': ['src/*']
        },
      },
    ],
  ],
};
