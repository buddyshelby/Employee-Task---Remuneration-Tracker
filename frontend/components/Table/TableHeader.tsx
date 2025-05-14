export default function TableHeader() {
  return (
    <tr>
        <th className='text-xs md:text-sm border-l-2 border-l-gray-200 px-2 py-1'>Employee</th>
        <th className='px-2 py-1 text-xs md:text-sm'>Task</th>
        <th className='px-2 py-1 text-xs md:text-sm'>Date</th>
        <th className='px-2 py-1 text-xs md:text-sm'>Hours</th>
        <th className='px-2 py-1 text-xs md:text-sm'></th>
        <th className='px-2 py-1 text-xs md:text-sm'>Rate</th>
        <th className='px-2 py-1 text-xs md:text-sm'></th>
        <th className='px-2 py-1 text-xs md:text-sm'>Additional</th>
        <th className='px-2 py-1 text-xs md:text-sm'>Total Remuneration</th>
        <th className='px-2 py-1 text-xs md:text-sm'>Action</th>
    </tr>
  )
}