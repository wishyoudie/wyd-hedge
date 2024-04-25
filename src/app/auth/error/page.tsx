type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

const MyServerComponent = (props: Props) => {
  const searchParams = props.searchParams;
  return <div>{JSON.stringify(searchParams)}</div>;
};

export default function AuthErrorPage(props: Props) {
  return (
    <div>
      <MyServerComponent searchParams={props.searchParams} />
    </div>
  );
}
