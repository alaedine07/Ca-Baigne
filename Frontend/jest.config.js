module.exports = {
    "moduleNameMapper": {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    preset: 'ts-jest',
    transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    },
    globals: {
        "ts-jest": {
          isolatedModules: true,
        },
      },
  }
