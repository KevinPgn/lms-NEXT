import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const SelectGroups = () => {
  return <div className="w-[100px]">
    <Select>
      <SelectTrigger className="bg-[#080810] border-white/10 text-white">
        <SelectValue placeholder="Grouple" />
      </SelectTrigger>
      <SelectContent className="bg-[#080810] border-white/10 text-white">
        <SelectItem value="1">Group 1</SelectItem>
        <SelectItem value="2">Group 2</SelectItem>
        <SelectItem value="3">Group 3</SelectItem>
      </SelectContent>
    </Select>
  </div>
}