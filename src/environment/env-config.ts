export default () => ({
    Port: parseInt(process.env.PORT, 10) || 3000,
    DBName: process.env.DBNAME,
    ConnesctionString: {
      Url: process.env.DBCONNECTIONSTRING,
      Port: parseInt(process.env.DATABASE_PORT, 10) || 27017
    }, 
    JWTSecrete:process.env.JWTSECRETE,
    DefaultToken:process.env.DEFAULTTOKEN
  });
