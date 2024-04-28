import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select/select";

export default function SelectType() {
  const t = useTranslations("global");

  return (
    <Select name="type" required>
      <SelectTrigger>
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="income">{t("income")}</SelectItem>
          <SelectItem value="expense">{t("expense")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
