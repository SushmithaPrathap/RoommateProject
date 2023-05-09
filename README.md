### **Instructions to run →**
1. Clone repo
2. In the terminal: npm i
3. npm run dev
4. npm start

### **Project Description →**

The House Management App is a software solution designed to help housemates manage their household responsibilities efficiently. The application provides a centralized platform for managing tasks, expenses, and communication between housemates. The main goal of the application is to streamline and automate the house management processes, reduce conflicts, and improve the overall experience of living together.

### **Key Features →**

1. Task Management: The application provides a dashboard for managing household chores, groceries, bills, and other responsibilities. It allows housemates to create, assign, and track tasks, set up reminders and notifications, and mark tasks as completed.
2. Shopping List: The application has a shared shopping list that allows housemates to add, edit, and delete items. It enables housemates to assign items to specific individuals, set reminders for when items need to be purchased, and track purchases.
3. Expense Tracking: The application allows housemates to track expenses related to rent, utilities, groceries, and other household expenses. It enables housemates to split bills, track payments, and view expense reports.
4. Chore Chart: The application has a chore chart that assigns specific tasks to individual housemates on a rotating basis. It enables housemates to mark off completed tasks, track their progress over time, and adjust the chore chart as needed.
5. Announcements and Notifications: The application provides announcements and notifications for upcoming events, deadlines, and tasks. It sends notifications when new tasks are assigned or completed, and when bills are due.


### Benefits:

1. Increased Efficiency: By automating manual tasks, the application saves time and reduces the workload of housemates.
2. Improved Communication: The application provides a centralized platform for communicating and sharing information, which reduces conflicts and misunderstandings.
3. Better Data Management: The application centralizes all household data, tasks, and expenses, which makes it easier to manage and analyze data for decision-making.
4. Cost Savings: By tracking expenses and splitting bills, the application helps housemates save money and avoid unnecessary expenses.

### User Stories
1.	As a user, I want to create a new account so that I can access the app's features and join a house.
2.	As a user, I want to be able to log in to my account easily and securely so that I can continue using the app where I left off.
3.	As a user, I want to create and assign tasks to myself and other housemates, so that we can keep track of our responsibilities and ensure that everything is taken care of in a timely manner.
4.  As a user, I want the app to have a search feature, so that I can quickly find specific tasks, events, or expenses within the app.
5.	As a user, I want to see the shopping list
6.  As a user, I need to be able to see announcements related to my house.
7.	As a user, I want to be able to track expenses and payments for shared household items, so that we can easily split costs and avoid disputes over who owes what.
8.	As a user, I want to be able to view reports and statistics on our household expenses and task completion rates, so that we can identify areas for improvement and make adjustments as needed.


### REST API Resources:
User Resource
/users: GET, POST, PUT, DELETE

/users/{id}: GET, PUT, DELETE

Authentication Resource

/login: POST

/logout: POST


/users/{id}/assigned-tasks: GET

Expenses Resource

/expenses: GET, POST

/reminders/{id}: GET, PUT, DELETE

Shopping list Resource

/shoppinglist: GET, POST

/shoppinglist/{id}: GET, PUT, DELETE

Chore Chart resources

/chorechart: GET, POST

/chorechart/{id}: GET, PUT, DELETE


