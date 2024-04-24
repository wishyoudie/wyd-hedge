import ThemeToggle from "~/app/theme/theme-select";
import { updateUserSettings } from "~/server/queries";
import BackButton from "~/shared/ui/back-button";
import { Button } from "~/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/select";

export default function SettingsPage() {
  return (
    <>
      <form
        action={async (formData: FormData) => {
          "use server";

          const data = {
            currency: formData.get("currency") as string,
            locale: formData.get("locale") as string,
          };

          await updateUserSettings(data);
        }}
      >
        <section className="px-4">
          <ThemeToggle />
          <Select name="currency" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="RUB">RUB</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select name="locale" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ru-RU">Русский</SelectItem>
                <SelectItem value="en-GB">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
        <Button type="submit">Save changes</Button>
      </form>
      <BackButton to={-1} />
    </>
  );
}
