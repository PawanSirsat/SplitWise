import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
import { ExpenseValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import {  useCreateExpense, useGetGroupById } from "@/lib/react-query/queries";
import { INewExpense } from "@/types";
import { useEffect, useState } from "react";

const AddExpense = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: GroupData, isLoading: isGroupDataLoading } = useGetGroupById(id!);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  
  const form = useForm<INewExpense>({
    resolver: zodResolver(ExpenseValidation),
    defaultValues: {
      desc: "",
      paidBy: "me", // Set the default value based on your logic
      group: id, // Set the default value to the group ID
      Time: new Date().toISOString(), // Set the default value to the current time
      splitMember: [], // Set the default value based on your logic
      amount: "",
    },
  });

  const handleMemberCheckboxChange = (memberId: string) => {
    setSelectedMembers((prevMembers) =>
      prevMembers.includes(memberId)
        ? prevMembers.filter((id) => id !== memberId)
        : [...prevMembers, memberId]
    );
  };

 useEffect(() => {
  form.setValue("splitMember", selectedMembers);
}, [selectedMembers]);

 const [selectedPaidBy, setSelectedPaidBy] = useState<string>('');

  const handlePaidByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaidBy(event.target.value);
  };

 const { mutateAsync: createExpense, isLoading: isLoadingCreate } = useCreateExpense();
 
 const handleSubmit = async (value: INewExpense) => {

     const newExpense = await createExpense({
      ...value,
      group: id!, 
      paidBy: selectedPaidBy,
      Time: new Date().toISOString(),
      splitMember:selectedMembers
    });

    if (!newExpense) {
      toast({
        title: `Expense creation failed. Please try again.`,
      });
    } else {
      navigate(`/groups/${id}`);
    }
  
};


  return (
   <Form {...form}>
    <div className="common-container">
    <div className="user-container">
    <div className="container p-5 flex flex-col">
      { isGroupDataLoading ? (
        <Loader />
      ) : GroupData?.length === 0 ? (
        <p className="text-white font-bold mb-2">You are not part of any groups.</p>
      ) : (
      <>
       <h2 className="text-lg font-bold mb-2 text-white">Add Expense in "{GroupData?.groupName}"</h2>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5 w-full  max-w-5xl text-gray-300">

        {/* Description Field */}
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Description</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

         {/* Amount Field */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Amount</FormLabel>
              <FormControl>
                <Input type="number" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {/* Paid By Field (Assuming a select dropdown, replace it with your logic) */}
        {/* Add your logic for selecting the user */}
     <div className="flex gap-4">
      <FormField
        control={form.control}
        name="paidBy"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label mr-2">Paid By</FormLabel>
            <FormControl>
              {/* Dropdown for selecting members */}
              <select
                className="shad-input rounded"
                {...field}
                value={selectedPaidBy}
                onChange={handlePaidByChange}
              >
                {GroupData?.Members?.map((member: { $id: string, name: string }) => (
                  <option key={member.$id} value={member.$id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <div>
     
     <span className="shad-form_label mr-2">Split In</span>
      <div style={{ maxHeight: "100px", overflowY: "auto" }} className="custom-scrollbar">
       {GroupData?.Members?.map((member:any) => (
    <div key={member.$id}>
        <ul className="p-1 m-1 w-48 text-sm font-medium text-gray-900 bg-gray-600 border
         border-gray-600 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-600 rounded-t-lg dark:border-gray-600">
        <input className="w-4 h-4 text-blue-600  border-gray-300 rounded focus:ring-blue-500 
          dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 
           focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              type="checkbox"
              id={member.$id}
              value={member.$id}
              checked={selectedMembers.includes(member.$id)}
              onChange={() => handleMemberCheckboxChange(member.$id)}
            />
            <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray- 
             300" htmlFor={member.$id}>{member.name}</label>
            </li>
          </ul>      
      </div>
    ))}
      </div>
    
  </div>      
</div>

  {/* Split Member Field */}
               
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
            disabled={isLoadingCreate}>
            {(isLoadingCreate) && <Loader />}
            Add Expense
          </Button>
        </div>
      </form>
      </>
      )}  
     </div>
    </div>
   </div>
  </Form>                                         
 );
};

export default AddExpense;