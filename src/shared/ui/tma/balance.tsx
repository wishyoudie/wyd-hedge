import { formatMoney } from "~/shared/lib/utils";

type BalanceProps = {
  value: number;
  currency?: string;
};

export default function Balance(props: BalanceProps) {
  return (
    <div className="flex flex-col items-center py-2">
      <span className="text-base">Баланс</span>
      <span className="whitespace-nowrap text-5xl font-bold">
        {formatMoney(props.value, props.currency)}
      </span>
    </div>
  );
}
