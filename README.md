# myKFZ codebase
Welcome to myKFZ!
Our application consists of three parts: database (mongodb), backend (express, node) and frontend (react).
Please refer to the READMEs of backend and frontend on how to set them up initially.

Once you set up everything, you can run refer to the quick start guide.
# Quick start guide
```bash
# start backend
cd backend/
npm run devstart

cd..

# start frontend
cd frontend/
npm start
```

# myKFZ preview
To get an impression of the design and the structure of our application, we provided some screenshots and a short description here.

As our application targets vehicle owners as well as district administratives/representatives and our use cases
are at the intersection of both of them, we strove to create an application that serves both

# For vehicle owners
The login for vehicle owners is reachable at "/login".
After a succesful registration and login, you need to verify yourself.
![Alt text](/screenshots/user-verification.png?raw=true "User verification")


Then you can access the dashoard: 
![Alt text](/screenshots/dashboard.png?raw=true "dashboard")

From here, you can add your vehicle with all its information, and then start a registration or deregistration process.
![Alt text](/screenshots/add-vehicle.png?raw=true "Add vehicle")

In case you would like to register your vehicle, make sure to reserve a license plate before starting the registration process.
![Alt text](/screenshots/plate-reservation.png?raw=true "License plate reservation")

After succesfully completing a process form and paying, a district administrative may approve your process.
You can track the status of your process in the vehicle dashboard.

# For district
The login for districts is available at "/districtLogin".
Note that it is not possible to register your district on your own. 
Please contact us via Mail (mikefrommykfz@gmail.com) to create an account for your district!

After you received the login credentials, you can login to the district dashboard.
Here you can see all the vehicle administration processes concerning your district and approve or reject them.
Once you approved/rejected a process, the vehicle owner will be notified via Mail.

![Alt text](/screenshots/district-dashboard.png?raw=true "District dashboard")
