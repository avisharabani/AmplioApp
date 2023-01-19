
1). download the zip file from this URL: https://github.com/avisharabani/AmplioApp/archive/refs/heads/frontend.zip
2). extract the files and open the folder containing the 2 files "frontend" & "backend"
3). open the file in the vc workspace

***server:***
4). open terminal and navigate to '\backend' and tap "npm i" 
5). (if the command is not recognized - need to close the environment and install node)
6). create new file (in backend lvl) by name .env and copy paste this code below:

PORT=5000 
NODE_ENV = 'production'
MONGO_URI= mongodb+srv://<secret-key>@ampliopolls.kiihae7.mongodb.net/?retryWrites=true&w=majority

7). replace the tag <secret-key> with secret key that I sent
4). tap "npm run dev"
5). open browser at http://localhost:5000/
6). navigate to Documentation
7). maximize one of sections and select "Try it out" and then push "Execute" to play with data

***client:***
8). open another new terminal and navigate to '\frontend' and tap "npm i" 
9). after the installation tap "npm start"
10).open browser at http://localhost:3000  

***db:***
11). visit mongodb https://account.mongodb.com/account/login 
12). enter to site with credentials that I sent 
13). click at "Browse Collections" to see the all data