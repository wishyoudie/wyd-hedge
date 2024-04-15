import dynamic from "next/dynamic";
import { EnvDecider } from "./_components/envdecider";

export default dynamic(() => Promise.resolve(EnvDecider), { ssr: false });
