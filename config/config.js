module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": "data/database_development.sqlite3",
    "logging": console.log
    
  },
  "test": {
    "dialect": "sqlite",
    "storage": "data/database_test.sqlite3",
    "logging": console.log
    
  },
  "production": {
    "dialect": "sqlite",
    "storage": "data/database_production.sqlite3",
    "logging": console.log
    
  }
}
