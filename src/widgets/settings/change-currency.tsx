import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select/select";
import Settings from "~/shared/lib/settings";

type Props = {
  defaultValue?: string;
  placeholder?: string;
  name: string;
};

export default function SelectCurrency(props: Props) {
  return (
    <Select name={props.name} defaultValue={props.defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder ?? props.defaultValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Settings.currencies.map((currency) => (
            <SelectItem key={currency} value={currency}>
              {currency.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
