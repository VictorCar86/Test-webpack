const fs = require("fs")

fs.writeFileSync("./.env", `API_APP=${process.env.API}\n`)