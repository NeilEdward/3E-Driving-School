import CButton from "@/components/custom/CButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { branchSchema } from "@/schema/branch.schema";
import type { BranchesFormProps, BranchShema } from "@/types/branch.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const BranchesFormDialog = ({ open = false, onClose, data }: BranchesFormProps) => {
  const form = useForm<BranchShema>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branch: "",
      address: "",
    },
  });

  // Set form values if data is provided (for update)
  useEffect(() => {
    if (data) {
      form.reset({
        branch: data.branch || "",
        address: data.address || "",
      });
    } else {
      form.reset({
        branch: "",
        address: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onBranchFormSubmit = (data: BranchShema) => {
    console.log({ data }, "CREATED NEW BRANCH");
  };

  const onFormClose = () => {
    onClose();
    form.clearErrors();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onFormClose}>
      <DialogContent>
        <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onBranchFormSubmit)}>
            <DialogHeader>
              <DialogTitle>Create New Branch</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Name</FormLabel>
                  <FormControl>
                    <Input placeholder="San Jose Branch" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Address</FormLabel>
                  <FormControl>
                    <Input placeholder="San Jose City, Nueva Ecija" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <DialogFooter>
            <Button variant="outline" className="cursor-pointer" onClick={onFormClose}>
              Cancel
            </Button>
            <CButton type="submit" label="Submit" onClick={form.handleSubmit(onBranchFormSubmit)} />
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
