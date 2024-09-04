# SplitWise Clone

SpendShare is a web application for splitting expenses in groups. It allows users to manage groups, track expenses, and view activity history.
### Installation

1. Clone the repository:

```bash
git clone https://github.com/PawanSirsat/SpendShare.git
```

2. Installation

```bash
cd spendshare
npm install
```
3. Install Tailwind

```bash
npm install -D tailwindcss
npx tailwindcss init
```
3. Setup Appwrite (Database Design)

1) Create Appwrite Account
2) Create New Project (ex: Splitwise)
3) Go into Databases and Create one Database (ex: Expense)
4) Now Create 5 Collections (Users, Groups, Activity, Friends, Transaction)
5) Go to the Attribute Section in every Collection and Create this Following attributes

User:-
   ```bash
    Key: UserName   Type: string  Default Value: -
    Key: email      Type: email   Default Value: -
    Key: accountId  Type: string  Default Value: -
    Key: accountId  Type: string  Default Value: -
   ```
     Groups:-
   ```bash
    Key: groupName  Type: string  Default Value: -
   
    Key: Creator    Type: Relationship Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): groups, Relation: Many to one,
    On deleting a document: Cascade - delete all related documents,
   
    Key: Members    Type: Relationship, Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): userMember, Relation: Many to Many,
    On deleting a document: set Null
   ```
 Friends:-
   ```bash
    Key: friendsId,    Type: Relationship Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): friendCollection, Relation: Many to many,
    On deleting a document: set Null
   
    Key: CollectionId, Type: Relationship, Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): List, Relation: Many to one,
    On deleting a document: set Null
   ```
Activity:-
   ```bash
    Key: Desc  Type: string  Default Value: -
    Key: Time  Type: DateTime  Default Value: -
    Key: Amout Type: string  Default Value: -  Required // Here the amount spelling is incorrect in my database (If you change here also change in react app)
    Key: IsSettled  Type: boolean  Default Value: - false

    Key: splitMember  Type: Relationship Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): members, Relation: Many to many,
    On deleting a document: set Null
   
    Key: PaidBy    Type: Relationship Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): activity, Relation: Many to one,
    On deleting a document: set Null
   
    Key: Group    Type: Relationship, Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): activity, Relation: Many to one,
    On deleting a document: Cascade - delete all related documents
   ```
Transaction:-
   ```bash
    Key: Amount  Type: string  Default Value: -
    Key: Time  Type: DateTime  Default Value: -
    Key: Isold  Type: boolean  Default Value: - false

    Key: payerId  Type: Relationship Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): transaction, Relation: Many to one,
    On deleting a document: set Null

    Key: receiverId  Type: Relationship, Rel-Type: Two-way Relationship, Related Collection: Users, Attribute Key (related collection): transactionId, Relation: Many to one,
    On deleting a document: set Null
   ```
      
5. Run Project
```bash
npm run dev
```


# Login
![Screenshot (463)](https://github.com/PawanSirsat/SplitWise/assets/48860105/6feaf149-4f67-474b-ac5b-a61f6eacbb63)

# Signup
![Screenshot (464)](https://github.com/PawanSirsat/SplitWise/assets/48860105/71c31b5f-beee-4a61-87ff-3398fdd6e98f)

# Home
![Screenshot (457)](https://github.com/PawanSirsat/SplitWise/assets/48860105/b09536d8-43a5-402d-8590-7b6c4edbfd59)

# All Activity
![Screenshot (458)](https://github.com/PawanSirsat/SplitWise/assets/48860105/63a37885-204b-4d6c-b1e1-6d2f09b3dcd8)

# Group Activity
![Screenshot (460)](https://github.com/PawanSirsat/SplitWise/assets/48860105/ae8b0631-8a98-49d1-96cb-9810a0673586)

# Profile 
![Screenshot (459)](https://github.com/PawanSirsat/SplitWise/assets/48860105/8f6f3be7-7883-483b-9e23-05aaf8fcc29f)


### Built With

React - A JavaScript library for building user interfaces.
React Router - Declarative routing for React.js.
Tailwind CSS - A utility-first CSS framework.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
