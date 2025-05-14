import { InterfaceTableCell } from "@/types";

export default function TableCell({ borderLeft, children }: InterfaceTableCell) {
  return <td className={`text-xs md:text-sm ${ borderLeft ? 'border-l-2 border-neutral-500 ': '' }px-2 py-1 text-center`}>{children}</td>;
}