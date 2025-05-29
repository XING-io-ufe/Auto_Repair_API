node install
create folder your_name

npm init -y

npm i express dotenv cors body-parser helmet tsx typescript prisma nodemon @prisma/client @vonage/server-sdk jsonwebtoken

npm i -D @types/node @types/express @types/cors @types/helmet @types/body-parser typescript tsx prisma

create nodemon.json file
{
"watch": ["src", ".env"],
"ext": "js,ts, json",
"ignore": ["src/logs/*", "src/**/*.{spec, test}.ts"],
"exec": "tsx src/index.ts"
}

npx tsc --init

src folder create

.env create

package.json add

"main": "./src/index.ts",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "nodemon",
"build": "tsc"
},

run command
npm run dev

npx prisma init --datasource-provider postgresql

npx prisma migrate dev --name init
npx prisma generate
