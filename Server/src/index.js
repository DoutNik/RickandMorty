const app = require("./app");
const PORT = 3001;
const {conn}=require('../DB_connection')

conn.sync()
.then(()=>{
console.log("Database synchronized successfully");
  
app.listen(PORT, () => {
 console.log(`Server raised on port: ${PORT}`);
  });
})
.catch((error)=>{
console.error("Error synchronizing database:", error)
});