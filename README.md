
<p align="center">
  <img src="https://github.com/user-attachments/assets/b44a514e-0a41-4f09-8786-fc529ed51cf9" alt="Splitwise clone Banner"/>
</p>

---

# **📄 SplitWise Clone Installation Guide**

### 📚 **Table of Contents**
1. [📥 Clone the Repository](#-1-clone-the-repository)
2. [📦 Install Dependencies](#-2-install-dependencies)
3. [🎨 Install and Configure Tailwind CSS](#-3-install-and-configure-tailwind-css)
4. [🗄️ Setup Appwrite (Database Configuration)](#-4-setup-appwrite-database-configuration)
    - [🔑 Create an Appwrite Account](#-step-1-create-an-appwrite-account)
    - [📁 Create a New Project](#-step-2-create-a-new-project)
    - [🛠️ Setup the Database](#-step-3-setup-the-database)
    - [🏗️ Create Collections](#-step-4-create-collections)
    - [🔒 Update Collection Permissions](#-step-5-update-collection-permissions)
    - [🔑 Copy IDs to .env File](#-step-6-copy-ids-to-env-file)
5. [🚀 Run the Project](#-5-run-the-project)
6. [🌐 Deploy on Vercel](#-6-deploy-on-vercel)
    - [🔌 Configure Appwrite Integration](#-configure-appwrite-integration)
7. [📧 Need Help?](#-need-help)
8. [🎥 Appwrite Database Guide Video](#-appwrite-database-guide-video)
9. [📑 Documentation](#-documentation)
    - [📂 Google Drive](#google-drive)
    - [📄 DOC PDF](#doc-pdf)
10. [📊 Database Design](#-database-design)
11. [🔄 Flowchart](#-flowchart)
12. [💸 Simplify Debt Flowchart](#-simplify-debt-flowchart)

---

### 📥 **1. Clone the Repository**

Begin by cloning the SplitWise repository to your local machine:

```bash
git clone https://github.com/PawanSirsat/SplitWise.git
```

### 📦 **2. Install Dependencies**

Navigate to the project directory and install the required Node.js packages:

```bash
cd splitwise
npm install
```

### 🎨 **3. Install and Configure Tailwind CSS**

Install Tailwind CSS and initialize it in your project:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

### 🗄️ **4. Setup Appwrite (Database Configuration)**

#### 🔑 **Step 1: Create an Appwrite Account**
- Sign up for an Appwrite account at [Appwrite](https://appwrite.io).

#### 📁 **Step 2: Create a New Project**
- In the Appwrite dashboard, create a new project (e.g., **Splitwise**).

#### 🛠️ **Step 3: Setup the Database**
- Go to the **Databases** section and create a new database (e.g., **Expense**).

#### 🏗️ **Step 4: Create Collections**

Create the following collections within your database:

1. **Users**

   - **UserName**: `string` (Default: `-`)
   - **name**: `string` (Default: `-`)
   - **email**: `email` (Default: `-`)
   - **accountId**: `string` (Default: `-`)

2. **Groups**

   - **groupName**: `string` (Default: `-`)
   - **Creator**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Attribute Key (related collection): groups, Cascade on delete)
   - **Members**: `Relationship` (Two-way Relationship with **Users**; `Many to Many`, Attribute Key (related collection): userMember, Set Null on delete)

3. **Friends**

   - **friendsId**: `Relationship` (Two-way Relationship with **Users**; `Many to many`, Attribute Key (related collection): friendCollection, Set Null on delete)
   - **CollectionId**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Attribute Key (related collection): List, Set Null on delete)

4. **Activity**

   - **Desc**: `string` (Default: `-`)
   - **Time**: `DateTime` (Default: `-`)
   - **Amout**: `string` (Default: `-`) _Note: If you change this spelling (Amout), update it in the React app._
   - **IsSettled**: `boolean` (Default: `false`)
   - **splitMember**: `Relationship` (Two-way Relationship with **Users**; `Many to many`, Attribute Key (related collection): members, Set Null on delete)
   - **PaidBy**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Attribute Key (related collection): activity, Set Null on delete)
   - **Group**: `Relationship` (Two-way Relationship with **Groups**; `Many to one`, Attribute Key (related collection): activity, Cascade on delete)

5. **Transaction**
   - **Amount**: `string` (Default: `-`)
   - **Time**: `DateTime` (Default: `-`)
   - **IsOld**: `boolean` (Default: `false`)
   - **payerId**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Attribute Key (related collection): transaction, Set Null on delete)
   - **receiverId**: `Relationship` (Two-way Relationship with **Users**; `Many to one`, Attribute Key (related collection): transactionId, Set Null on delete)

#### 🔒 **Step 5: Update Collection Permissions**

1. **Navigate to Collection Settings**:

   - In your **Appwrite** dashboard, open the **Collection Settings** for each collection that requires permission changes.

2. **Modify Permissions**:

   - For each collection, go to the **Settings** tab.
   - Under the **Permissions** section, update the role to `Any`.
   - Ensure that the following permissions are checked:
     - **Create**
     - **Read**
     - **Update**
     - **Delete**

3. **Save Changes**:
   - Repeat the process for each collection, ensuring the correct permissions are applied.

---

#### 🔑 **Step 6: Copy IDs to .env File**

1. In **Project Settings**, copy the **Project ID** and **API Endpoint**.
2. Copy the **Database ID** and all **Collection IDs** from the database.
3. Create a `.env.local` file and add the copied IDs as follows:

#### **Sample .env.local File**

```bash
VITE_APPWRITE_URL='https://cloud.appwrite.io/v1'
VITE_APPWRITE_PROJECT_ID='67c067565211fbcf173'
VITE_APPWRITE_DATABASE_ID='657c0953b37f27853d8'
VITE_APPWRITE_USER_COLLECTION_ID='657casd56db7f49cee3b20'
VITE_APPWRITE_GROUPS_COLLECTION_ID='657c09839424664asd87496'
VITE_APPWRITE_ACTIVITY_COLLECTION_ID='657c099dd2eda1ddebb'
VITE_APPWRITE_FRIENDS_COLLECTION_ID='681b28b356casds5dd28d'
VITE_APPWRITE_TRANSACTION_COLLECTION_ID='65aasd54f3a07aec3c8'
```

---

### 🚀 **5. Run the Project**

Finally, start the development server:

```bash
npm run dev
```

---

### 🌐 **6. Deploy on Vercel**

1. **Deploy on Vercel**:

   - Go to [Vercel](https://vercel.com/) and sign in or sign up.
   - Connect your **GitHub** account and select the Git repository of the project you want to deploy.
   - Follow the prompts to deploy your project. Vercel will handle the deployment and provide you with a live URL once completed.

2. **Configure Appwrite Integration**:
   - After deployment, copy the Vercel deployment URL (e.g., `https://your-project-name.vercel.app`).
   - Log in to your **Appwrite** dashboard.
   - Go to your **Project Overview** and scroll down to the **Integrations** section.
   - Click **Add Platform** and select `Web App`.
   - In the `Name` field, paste your Vercel deployment URL, and in the `Hostname` field, enter `*.vercel.app`.
3. **Complete Setup**:
   - Skip any additional configurations unless required by your project setup.
   - Your app is now deployed and integrated with Appwrite! 🎉

---

### 📧 **Need Help?**

If you encounter any issues with the database or need further assistance, feel free to email me at: p1.sirsat1998@gmail.com.

---

### 🎥 **Appwrite Database Guide Video**

https://github.com/user-attachments/assets/a09c0edf-5d71-4417-b03d-39db91105be6

---

### 📑 **Documentation**

#### 📂 **Google Drive**  

[Google Drive Complete Application DOC](https://drive.google.com/drive/folders/1nG6kY0vprGZ4sazl2pUZ6ee1TMno9BVI?usp=drive_link)

#### 📄 **DOC PDF**  

[splitwise_documentation.pdf](https://github.com/user-attachments/files/16871474/splitwise_documentation.pdf)

---

### 📊 **Database Design**

![DataBase Design 1](https://github.com/user-attachments/assets/26d84039-10e9-4d9b-b04d-442017fbcb80)

---

### 🔄 **Flowchart**

![FlowChart](https://github.com/user-attachments/assets/6add1f3d-8f64-43e9-8c78-cedcd18032d4)

---

### 💸 **Simplify Debt Flowchart**

![Simplify Debt Flow](https://github.com/user-attachments/assets/9114c101-d851-48d5-a7ab-15f1b1b69f5c)

---

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
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
