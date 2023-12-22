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
} from "@/components/ui";
import { GroupValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { Loader } from "@/components/shared";
import {  useCreateGroup } from "@/lib/react-query/queries";

type PostFormProps = {
  group?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ group, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    // ACTION = CREATE
    const newGroup = await createGroup({
      ...value,
      userId: user.id,
      groupName: value.groupname,
      members: [user.id]
    });

    if (!newGroup) {
      toast({
        title: `${action} group failed. Please try again.`,
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
            style={{ backgroundColor: '#1CC29F' }}
            className="whitespace-nowrap"
            disabled={isLoadingCreate }>
            {(isLoadingCreate) && <Loader />}
            {action} 
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
