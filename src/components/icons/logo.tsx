import type { SVGProps } from "react";

export default function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M7.756 3.203v1.19h8.498v-1.19c0-.546-.328-.898-.858-.898H8.604c-.52 0-.848.352-.848.898Zm4.239 8.53c-4.165 0-8.138-.728-11.995-2.572v-.886c0-2.56 1.166-3.883 3.423-3.883h2.13V3.094C5.552 1.153 6.642 0 8.465 0h7.068c1.822 0 2.914 1.153 2.914 3.094v1.298h2.13C22.845 4.392 24 5.715 24 8.275v.886c-3.857 1.844-7.83 2.572-12.005 2.572ZM3.423 24C1.166 24 0 22.69 0 20.117v-8.65c3.221 1.346 6.125 1.977 9.06 2.232v.958c0 .922.466 1.432 1.282 1.432h3.306c.826 0 1.292-.51 1.292-1.432V13.7c2.935-.255 5.839-.886 9.06-2.233v8.651C24 22.69 22.845 24 20.578 24H3.422Z" />
    </svg>
  );
}