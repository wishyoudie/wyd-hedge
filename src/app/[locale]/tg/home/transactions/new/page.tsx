"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Input,
  List,
  Section,
  Select,
} from "@telegram-apps/telegram-ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  currency: z.enum(["rub", "usd"]),
});
export default function NewTransactionPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <List>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Section header="Name">
                    <Input placeholder="Morning Latte" {...field} />
                  </Section>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Section header="Currency">
                    <Select {...field}>
                      <option value="rub">RUB</option>
                      <option value="usd">USD</option>
                    </Select>
                  </Section>
                </FormControl>
              </FormItem>
            )}
          />
        </List>
      </form>
    </Form>
  );
}
