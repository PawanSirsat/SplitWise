import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  toast,
} from "@/components/ui";
import { GroupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { Loader } from "@/components/shared";
import { useCreateGroup } from "@/lib/react-query/queries";

type PostFormProps = {
  group?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ group, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof GroupValidation>>({
    resolver: zodResolver(GroupValidation),
    defaultValues: {
      groupname: group ? group.name : "",
    },
  });

  // Query
  const { mutateAsync: createGroup, isLoading: isLoadingCreate } =
    useCreateGroup();

  // Handler
  const handleSubmit = async (value: z.infer<typeof GroupValidation>) => {
    // Check if any value is null
    if (user.id === null || value.groupname === null) {
      toast({
        title: `Create group failed. Please try again.`,
      });
      return; // Stop further execution if user.id is null
    }

    // ACTION = CREATE
    const newGroup = await createGroup({
      ...value,
      userId: user.id,
      groupName: value.groupname,
      members: [user.id],
    });

    if (!newGroup) {
      toast({
        title: `Create group failed. Please try again.`,
      });
    } else {
      toast({
        title: `Group Created Successfully.`,
      });
    }
    navigate("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="groupname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Group name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: "#1CC29F" }}
            className="whitespace-nowrap"
            disabled={isLoadingCreate}>
            {isLoadingCreate && <Loader />}
            {action}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
