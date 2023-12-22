import { Routes, Route } from "react-router-dom";
import {
  Home,
  Explore,
  Saved,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllActivity,
  CreateGroup,
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import AllFriends from "./_root/pages/AllFriends";
import AddFriend from "./_root/pages/AddFriend";

const App = () => {
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-friends" element={<AllFriends />} />
          <Route path="/all-activity" element={<AllActivity />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/add-friend" element={<AddFriend />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
