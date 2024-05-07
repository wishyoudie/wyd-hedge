import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Settings from "@/shared/lib/settings";

type Props = {
  defaultValue: string;
  name: string;
};

export default function SelectLocale(props: Props) {
  return (
    <Select name={props.name} defaultValue={props.defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={props.defaultValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Settings.locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {locale.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
