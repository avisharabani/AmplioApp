***server:***
1). open terminal and navigate to \Amplio\backend and tap "npm i" 
2). create file (in backend lvl) by name .env and copy paste this code below:

PORT=5000 
NODE_ENV = 'production'
MONGO_URI= mongodb+srv://<secret-key>@ampliopolls.kiihae7.mongodb.net/?retryWrites=true&w=majority

3). replace the tag <secret-key> with secret key that I sent
4). tap "npm start"
5). open browser at http://localhost:5000/
6). navigate to Documentation
7). maximize one of sections and select "Try it out" and then push "Execute" to play with data


***client:***
1). open new terminal and navigate to \Amplio\frontend and tap "npm i" 
2). tap "npm start"
3). open browser at http://localhost:3000  


***db:***
1). visit mongodb https://account.mongodb.com/account/login 
2). enter to site with credentials that I sent 
3). click at "Browse Collections" to see the all data