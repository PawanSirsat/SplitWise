import { Routes, Route } from "react-router-dom";
import { Home, Profile, AllActivity, CreateGroup } from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import AllFriends from "./_root/pages/AllFriends";
import AddFriend from "./_root/pages/AddFriend";
import AddMemberForm from "./components/forms/AddMemberForm";
import AddExpense from "./components/forms/AddExpense";
import GroupDetails from "./_root/pages/GroupDetails";
import Settlement from "./components/forms/Settlement";
import {
  useGetGroupsActivityById,
  useGetUserGroupsById,
} from "./lib/react-query/queries";
import { useUserContext } from "./context/AuthContext";
import { useEffect } from "react";

const App = () => {
  const { user, isLoading } = useUserContext();
  const group: any = user.group;
  const groupsActivityQuery = useGetGroupsActivityById(group);
  const userGroupsQuery = useGetUserGroupsById(group);

  useEffect(() => {
    if (!isLoading && user?.name.length !== 0) {
      groupsActivityQuery.refetch();
      userGroupsQuery.refetch();
    }
  }, [isLoading, user, groupsActivityQuery, userGroupsQuery]);
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-friends" element={<AllFriends />} />
          <Route path="/all-activity" element={<AllActivity />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/add-expense/:id" element={<AddExpense />} />
          <Route
            path="/settlement/:amount/:receiverID"
            element={<Settlement />}
          />
          <Route path="/add-friend" element={<AddFriend />} />
          <Route path="/groups/:id" element={<GroupDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-member/:id" element={<AddMemberForm />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
